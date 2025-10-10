"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { registerUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:  "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const phoneNumber = Number(formData.phone);

  if (isNaN(phoneNumber)) {
    alert("Please enter a valid phone number");
    return;
  }

  const payload = {
    ...formData,
    phone: phoneNumber,
  };

  const result = await dispatch(registerUser(payload));

  if (registerUser.fulfilled.match(result)) {
    router.push("/auth/login");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-md sm:max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 
                      transform transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mx-auto mb-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">Join us and get started today</p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg mb-4 text-center border border-red-200">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 
                        ${loading ? "opacity-70 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"}`}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 h-screen w-screen -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 h-72 w-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 h-80 w-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      </div>

      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 30px) scale(0.9); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;
