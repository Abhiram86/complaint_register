"use server";

import { revalidateTag } from "next/cache";

export async function handleDeleteComplaint(id: string) {
  const res = await fetch(
    `https://complaint-register-jet.vercel.app/api/complaints/${id}`,
    {
      method: "DELETE",
    }
  );
  if (res.ok) {
    revalidateTag("complaints");
  }
}
