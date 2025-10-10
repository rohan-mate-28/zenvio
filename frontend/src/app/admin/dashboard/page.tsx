"use client";

import API from '@/lib/axios';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserCog, Briefcase, Wallet } from "lucide-react";
 import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalClients: number;
  totalProjects: number;
  activeMaintenanceProjects: number;
  payments: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/getdashboardstats", {
          withCredentials: true,
        });
        setStats(res.data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const paymentData = [
    { name: "Paid", value: stats.payments.paid },
    { name: "Pending", value: stats.payments.pending },
    { name: "Failed", value: stats.payments.failed },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
       <Link href="/admin/users">
          <Card className="cursor-pointer hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-purple-500" /> Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalAdmins}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" /> Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalClients}</p>
          </CardContent>
        </Card>

          <Link href="/admin/projects">  
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-500" /> Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalProjects}</p>
            <p className="text-sm text-gray-500">
              Active: {stats.activeMaintenanceProjects}
            </p>
          </CardContent>
        </Card>
          </Link>


          <Link href="/admin/payments">  
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-500" /> client payments
            </CardTitle>
          </CardHeader>
           
        </Card>
          </Link>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-yellow-500" /> Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">₹{stats.payments.total}</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paymentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
