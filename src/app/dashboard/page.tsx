import AdminTable from "@/components/AdminTable";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: "Product" | "Service" | "Support" | "Security" | "Other";
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  user: {
    _id: string;
    username: string;
  };
  dateSubmitted: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const filters = await searchParams;
  const res = await fetch(
    `http://localhost:3000/api/complaints${`?${new URLSearchParams(
      filters
    ).toString()}`}`,
    {
      headers: await headers(),
      next: { tags: ["complaints"] },
    }
  );
  if (res.status === 401) redirect("/login");
  if (res.status === 403) {
    redirect("/");
  }
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = (await res.json()) as { complaints: Complaint[] };
  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      <AdminTable data={data.complaints} />
    </div>
  );
}
