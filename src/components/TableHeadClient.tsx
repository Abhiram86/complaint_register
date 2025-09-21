"use client";

import { ArrowUpDown } from "lucide-react";
import { TableHead } from "./ui/table";
import { useRouter, useSearchParams } from "next/navigation";

export default function TableHeadClient({ keys }: { keys: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const isActionKey = (key: string) => {
    return key === "priority" || key === "status" || key === "dateSubmitted";
  };
  return keys.map((key) => (
    <TableHead
      className={`group text-white ${
        isActionKey(key) ? "hover:bg-neutral-600 cursor-pointer" : ""
      }`}
      onClick={() =>
        isActionKey(key) &&
        router.push(
          `/dashboard?sort=${key}&order=${order === "asc" ? "desc" : "asc"}`
        )
      }
      key={key}
    >
      <span className="flex items-center gap-1">
        {key}
        {isActionKey(key) ? (
          <ArrowUpDown
            className="group-active:rotate-180 transition-transform mt-0.5"
            size={12}
          />
        ) : null}
      </span>
    </TableHead>
  ));
}
