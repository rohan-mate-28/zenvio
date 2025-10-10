"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store"; // adjust path

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");

  // Format the date on the client only
  useEffect(() => {
    if (user?.createdAt) {
      setFormattedDate(new Date(user.createdAt).toLocaleDateString());
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Number:</span>
              <span className="text-gray-800 capitalize">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Member Since:</span>
              <span className="text-gray-800">{formattedDate || "Loading..."}</span>
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/profile/update")}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfilePage;
