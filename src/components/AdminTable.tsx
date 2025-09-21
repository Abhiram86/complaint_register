import { Complaint } from "@/app/dashboard/page";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AdminTable({ data }: { data: Complaint[] }) {
  const rawKeys = Object.keys(data[0]);
  const keys = rawKeys.filter((key) => key !== "_id" && key !== "__v");
  return (
    <Table>
      <TableHeader className="bg-black">
        <TableRow className="hover:bg-black">
          {keys.map((key) => (
            <TableHead className="text-white" key={key}>
              {key}
            </TableHead>
          ))}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((complaint) => (
          <TableRow key={complaint._id}>
            <TableCell>{complaint.title}</TableCell>
            <TableCell className="max-w-xs truncate">
              {complaint.description}
            </TableCell>
            <TableCell>{complaint.category}</TableCell>
            <TableCell>
              <span
                className={`p-1 border rounded w-full ${
                  complaint.priority === "High"
                    ? "bg-red-100 border-red-300 text-red-800"
                    : complaint.priority === "Medium"
                    ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                    : "bg-green-100 border-green-300 text-green-800"
                }`}
              >
                {complaint.priority}
              </span>
            </TableCell>
            <TableCell
              className={`${
                complaint.status === "Resolved"
                  ? "text-green-500"
                  : complaint.status === "In Progress"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {complaint.status}
            </TableCell>
            <TableCell>{complaint.user.username}</TableCell>
            <TableCell>
              {new Date(complaint.dateSubmitted).toLocaleString()}
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/${complaint._id}`}>
                <Button
                  className="hover:bg-black hover:text-white"
                  variant={"ghost"}
                >
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
