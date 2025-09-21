"use server";

import { revalidateTag } from "next/cache";

export async function handleDeleteComplaint(id: string) {
  const res = await fetch(`http://localhost:3000/api/complaints/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    revalidateTag("complaints");
  }
}
