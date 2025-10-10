// src/pages/Profile.tsx
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateUser, loadUser, selectAuth } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, isAuthenticated } = useSelector((state: RootState) => selectAuth(state));

  // Local form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    } else {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone.toString(),
      });
    }
  }, [user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ 
      name: form.name, 
      email: form.email, 
      phone: Number(form.phone) 
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <Input name="phone" type="number" value={form.phone} onChange={handleChange} />
          </div>

          

          <Button 
            onClick={handleUpdate} 
            disabled={loading} 
            className="w-full"
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
