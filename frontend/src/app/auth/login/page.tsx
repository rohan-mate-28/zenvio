"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { loginUser, loadUser, loginWithToken, clearError } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import dotenv from "dotenv";
export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInitialLoadFinished, setIsInitialLoadFinished] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    const token = searchParams?.get("token");

    if (token) {
      dispatch(loginWithToken(token)).finally(() => setIsInitialLoadFinished(true));
    } else {
      dispatch(loadUser()).finally(() => setIsInitialLoadFinished(true));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isAuthenticated && isInitialLoadFinished) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitialLoadFinished, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(loginUser({ email, password }));
  };

  const displayError = error && isInitialLoadFinished;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-md sm:max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 
                      transform transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mx-auto mb-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">Sign in to access your dashboard</p>
        </div>

        {/* Loader */}
        {loading && !isAuthenticated && (
          <div className="text-center text-sm text-indigo-500 mb-4 font-medium animate-pulse">
            Checking authentication...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 
                        ${loading ? "opacity-70 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"}`}
            disabled={loading}
          >
            {loading && !isAuthenticated ? "Checking..." : "Log In Securely"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <span className="flex-1 border-t border-gray-200"></span>
            <span className="px-3 text-xs sm:text-sm font-medium text-gray-500 bg-white">OR</span>
            <span className="flex-1 border-t border-gray-200"></span>
          </div>

          {/* Google login */}
          <a
            // href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`}
            href="http://localhost:5000/api/auth/google"
            className="w-full flex items-center justify-center gap-3 bg-white py-2.5 border border-gray-300 
                       rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition duration-150 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M44.5 20H24V28H36.4C35.2 31.8 31.5 34.5 24 34.5..."/>
            </svg>
            Continue with Google
          </a>

          {displayError && (
            <p className="text-red-600 text-sm mt-4 font-medium text-center p-2 bg-red-50 rounded-lg">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
            Register now
          </a>
        </p>
      </div>

      {/* Animated background blobs */}
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
}
