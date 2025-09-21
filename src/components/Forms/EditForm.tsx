"use client";

import { Complaint } from "@/app/dashboard/page";
import { ComplaintForm } from "./ComplaintForm";
import { complaintSchema } from "@/lib/formSchemas";
import z from "zod";
import { useRouter } from "next/navigation";

export default function EditForm({ data }: { data: Complaint }) {
  const router = useRouter();
  async function handleSubmit(values: z.infer<typeof complaintSchema>) {
    const res = await fetch(`/api/complaints/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert("Complaint updated successfully");
      router.push("/dashboard");
    }
  }
  return <ComplaintForm onSubmit={handleSubmit} isAdmin defaultValues={data} />;
}
