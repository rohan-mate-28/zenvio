"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchAllPayments,
  updatePaymentStatus,
} from "@/store/slices/paymentSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, loading, error } = useSelector(
    (state: RootState) => state.payments
  );

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  const handleUpdate = (id: string, status: "pending" | "paid" | "failed") => {
    dispatch(updatePaymentStatus({ id, status }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {payments.map((p: any) => (
          <Card key={p._id} className="p-4 shadow-md border rounded-xl">
            <h2 className="text-lg font-semibold">
              {p.project?.title || "No Title"}
            </h2>
            <p>
              <strong>Client:</strong> {p.client?.name} ({p.client?.email})
            </p>
            <p>
              <strong>Amount:</strong> ₹{p.amount}
            </p>
            <p>
              <strong>Payment Date:</strong>{" "}
              {new Date(p.paymentDate).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  p.paymentStatus === "paid"
                    ? "bg-green-200 text-green-800"
                    : p.paymentStatus === "failed"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {p.paymentStatus}
              </span>
            </p>

            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => handleUpdate(p._id, "paid")}>
                Mark Paid
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleUpdate(p._id, "failed")}
              >
                Mark Failed
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdate(p._id, "pending")}
              >
                Mark Pending
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
