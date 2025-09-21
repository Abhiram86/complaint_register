"use client";
import { Button } from "./ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/complaints/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Complaint deleted successfully");
    }
  };
  return (
    <Button
      onClick={handleDelete}
      className="hover:bg-red-500 hover:text-white"
      variant={"ghost"}
    >
      Delete
    </Button>
  );
}
