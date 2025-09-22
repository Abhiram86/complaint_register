import { redirect } from "next/navigation";
import { Complaint } from "../page";
import { headers } from "next/headers";
import EditForm from "@/components/Forms/EditForm";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const res = await fetch(
    `https://complaint-register-jet.vercel.app/api/complaints/${param.id}`,
    {
      headers: await headers(),
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
