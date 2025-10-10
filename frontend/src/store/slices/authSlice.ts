import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/axios";
import { TokenAPI } from "@/lib/axios";
import { RootState } from "../index";

// --- User interface matching backend schema
interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: "admin" | "client";
createdAt?: string;
}

// --- Auth State
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// --- Thunks

// Login (Standard)
export const loginUser = createAsyncThunk<
  { user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    // Note: Since standard login uses cookies, we don't save a token here,
    // but future authenticated calls will rely on the token in localStorage
    // which will be checked by the Axios interceptor if available.
    const res = await API.post("/user/login", { email, password }, { withCredentials: true });
    return { user: res.data.user };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Login via JWT (Used after OAuth redirect)
// The payload now explicitly includes the token so the reducer can save it to localStorage.
export const loginWithToken = createAsyncThunk<
  { user: User, token: string }, // <-- UPDATED: Now returns the user object AND the token
  string, // The raw JWT passed from the URL
  { rejectValue: string }
>("auth/loginWithToken", async (token, thunkAPI) => {
  try {
    // Send the token in the Authorization header to the /me endpoint
    const res = await TokenAPI.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Note: We intentionally avoid 'withCredentials: true' here 
    });
    // The backend's /me returns { user: User }
    return { user: res.data.user, token }; // <-- UPDATED: Return both user and token
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "OAuth login failed");
  }
});


// Register
export const registerUser = createAsyncThunk<
  { user: User },
  { name: string; email: string; phone: number; password: string },
  { rejectValue: string }
>("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const res = await API.post("/user/register", userData, { withCredentials: true });
    return { user: res.data.user };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// Update Profile
export const updateUser = createAsyncThunk<User, { name?: string; email?: string; phone?: number }, { rejectValue: string }>(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const res = await API.put("/user/update", userData, { withCredentials: true });
      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// Load Current User (from cookie or token via interceptor)
export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/user/me", { withCredentials: true });
      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load user");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await API.post("/user/logout", {}, { withCredentials: true });
});

// --- Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login (Standard)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null; // Ensure success clears error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Login via Token (NEW)
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithToken.fulfilled, (state, action: PayloadAction<{ user: User, token: string }>) => { // <-- UPDATED PayloadAction
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null; // Ensure success clears error
        // 1. Save the token to local storage after successful verification
        localStorage.setItem('authToken', action.payload.token); 
        // 2. Clean the URL history after success
        window.history.replaceState({}, document.title, window.location.pathname);
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OAuth login failed";
        // Clean the URL history even on failure to hide the token
        window.history.replaceState({}, document.title, window.location.pathname);
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Update Profile
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })

      // Load User (FIX for Issue 2: Do NOT set error on expected unauthorized failure)
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending load
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null; // Clear error on successful load
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        // THE KEY FIX: If loadUser fails (which is normal for unauthenticated users), 
        // we intentionally clear the error state so the user doesn't see a generic API error.
        state.error = null; 
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        // CLEAR TOKEN: Remove token from local storage upon logout
        localStorage.removeItem('authToken'); 
      });
  },
});

export const { clearError } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
