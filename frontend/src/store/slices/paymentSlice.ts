"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "@/lib/axios";
const APII = "/payments";

// --- Types
interface Client {
  _id: string;
  name: string;
  email: string;
  phone: number;
}

interface Project {
  _id: string;
  title: string;
  price: number;
  status: string;
}

export interface Payment {
  _id: string;
  client: Client;
  project: Project;
  amount: number;
  type: "project" | "maintenance";
  paymentStatus: "pending" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentDate: string;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

// --- Initial state
const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

// --- Thunks

export const fetchAllPayments = createAsyncThunk<Payment[], void, { rejectValue: string }>(
  "payments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(`${APII}/all`, { withCredentials: true });
      return res.data.payments;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch payments");
    }
  }
);

export const fetchPaymentsByClient = createAsyncThunk<Payment[], string, { rejectValue: string }>(
  "payments/fetchByClient",
  async (clientId, { rejectWithValue }) => {
    try {
      const res = await API.get(`${APII}/client/${clientId}`, { withCredentials: true });
      return res.data.payments;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch client payments");
    }
  }
);

export const updatePaymentStatus = createAsyncThunk<
  Payment,
  { id: string; status: "pending" | "paid" | "failed" },
  { rejectValue: string }
>("payments/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await API.put(`${APII}/${id}/status`, { status }, { withCredentials: true });
    return res.data.payment;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to update status");
  }
});

// --- Slice
const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All
    builder.addCase(fetchAllPayments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(fetchAllPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch payments";
    });

    // Fetch By Client
    builder.addCase(fetchPaymentsByClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPaymentsByClient.fulfilled, (state, action: PayloadAction<Payment[]>) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(fetchPaymentsByClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch client payments";
    });

    // Update Payment Status
    builder.addCase(updatePaymentStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePaymentStatus.fulfilled, (state, action: PayloadAction<Payment>) => {
      state.loading = false;
      const index = state.payments.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.payments[index] = action.payload;
    });
    builder.addCase(updatePaymentStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update payment status";
    });
  },
});

export default paymentSlice.reducer;
