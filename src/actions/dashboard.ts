"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const handleDeleteComplaint = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/complaints/${id}`, {
    method: "DELETE",
    headers: await headers(),
  });
  if (res.ok) {
    revalidateTag("complaints");
  }
};
