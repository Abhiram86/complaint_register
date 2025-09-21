"use client";

import { ComplaintForm } from "@/components/Forms/ComplaintForm";
import { complaintSchema } from "@/lib/formSchemas";
import z from "zod";

export default function Help() {
  async function handleSubmit(values: z.infer<typeof complaintSchema>) {
    const res = await fetch("/api/complaints", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert("Complaint submitted successfully");
    }
  }
  return (
    <div className="p-4 mt-8 text-sm">
      <ComplaintForm onSubmit={handleSubmit} />
    </div>
  );
}
