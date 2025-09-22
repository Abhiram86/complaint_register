"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleDeleteComplaint = async (id: string) => {
  const res = await fetch(
    `https://complaint-register-jet.vercel.app/api/complaints/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("token")?.value}`,
      },
    }
  );
  if (res.ok) {
    revalidateTag("complaints");
  }
};
