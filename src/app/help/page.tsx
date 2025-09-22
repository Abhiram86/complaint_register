"use client";

import { ComplaintForm } from "@/components/Forms/ComplaintForm";
import { complaintSchema } from "@/lib/formSchemas";
import { useState } from "react";
import { toast } from "sonner";
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
        toast("Complaint submitted successfully", {
          position: "top-center",
        });
      } else {
        toast("Something went wrong", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        position: "top-center",
      });
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
