"use client";

import { Complaint } from "@/app/dashboard/page";
import { ComplaintForm } from "./ComplaintForm";
import { complaintSchema } from "@/lib/formSchemas";
import z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ data }: { data: Complaint }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(values: z.infer<typeof complaintSchema>) {
    setLoading(true);
    try {
      const res = await fetch(`/api/complaints/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        alert("Complaint updated successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ComplaintForm
      loading={loading}
      onSubmit={handleSubmit}
      isAdmin
      defaultValues={data}
    />
  );
}
