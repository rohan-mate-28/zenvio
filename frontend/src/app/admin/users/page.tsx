// src/app/users/page.tsx or wherever AllUsersPage is located
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API from "@/lib/axios";
import AllocateProjectModal from "@/components/AllocateProjectModal";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/alluser");
      setUsers(res.data.users || []); // adjust based on API response
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleProjectAllocationSuccess = () => {
    fetchUsers(); // Re-fetch the data from the server
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user._id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p className="capitalize">Role: {user.role}</p>
              <div className="mt-3">
                <AllocateProjectModal clientId={user._id} onProjectAllocated={handleProjectAllocationSuccess} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}