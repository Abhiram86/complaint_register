import { redirect } from "next/navigation";
import { Complaint } from "../page";
import EditForm from "@/components/Forms/EditForm";
import { cookies } from "next/headers";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `https://complaint-register-jet.vercel.app/api/complaints/${param.id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (res.status === 401) redirect("/login");
  if (res.status === 403) {
    redirect("/");
  }
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = (await res.json()) as { complaint: Complaint };
  return (
    <div>
      <EditForm data={data.complaint} />
    </div>
  );
}
