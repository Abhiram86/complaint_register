import { redirect } from "next/navigation";
import { Complaint } from "../page";
import { ComplaintForm } from "@/components/Forms/ComplaintForm";
import { headers } from "next/headers";
import EditForm from "@/components/Forms/EditForm";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const res = await fetch(`http://localhost:3000/api/complaints/${param.id}`, {
    headers: await headers(),
  });
  if (res.status === 401) redirect("/login");
  if (res.status === 403) {
    alert("You are not authorized to view this page");
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
