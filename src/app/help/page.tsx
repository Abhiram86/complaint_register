"use client";

import { ComplaintForm } from "@/components/Forms/ComplaintForm";
import { complaintSchema } from "@/lib/formSchemas";
import { useState } from "react";
import z from "zod";

export default function Help() {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(values: z.infer<typeof complaintSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        alert("Complaint submitted successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-4 mt-8 text-sm">
      <ComplaintForm loading={loading} onSubmit={handleSubmit} />
    </div>
  );
}
