"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Loader2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  price: number;
  status: string;
  startDate?: string;
  endDate?: string | null;
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface CreateOrderResponse {
  order: RazorpayOrder;
  key: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function MyOrders() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  // Fetch client projects
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/project/getMyorder", { withCredentials: true });
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Razorpay payment
  const handlePayment = async (projectId: string, amount: number,type:string) => {
    try {
      setPaymentLoading(projectId);

      // Create order on backend
      const res = await API.post<CreateOrderResponse>(
        "/payments/create-order",
        { projectId, amount ,type},
        { withCredentials: true }
      );

      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount * 100, // Razorpay expects paise
        currency: order.currency,
        name: "ZenVio",
        description: "Project Payment",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            await API.post("/payments/verify", response, { withCredentials: true });
            alert("✅ Payment Successful 🎉");
            fetchOrders();
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("❌ Payment Verification Failed");
          }
        },
        theme: { color: "#0f172a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment Failed");
    } finally {
      setPaymentLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600">No projects found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-3">{project.description}</p>

              {project.techStack.length > 0 && (
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Tech Stack:</span> {project.techStack.join(", ")}
                </p>
              )}

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Status:</span> {project.status}
              </p>

              {project.startDate && (
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Start Date:</span>{" "}
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
              )}

              {project.endDate && (
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">End Date:</span>{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              )}

              {project.price > 0 && (
                <>
                  <p className="text-lg font-semibold mt-3">Price: ₹{project.price}</p>
                  <button
                    onClick={() => handlePayment(project._id, project.price,'project')}
                    disabled={paymentLoading === project._id}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentLoading === project._id ? "Processing..." : "Pay Now"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
