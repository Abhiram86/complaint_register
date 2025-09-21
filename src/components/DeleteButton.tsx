"use client";
import { handleDeleteComplaint } from "@/actions/dashboard";
import { Button } from "./ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const handleSumbit = async () => {
    await handleDeleteComplaint(id);
  };
  return (
    <form action={handleSumbit}>
      <Button
        type="submit"
        className="hover:bg-red-500 hover:text-white"
        variant={"ghost"}
      >
        Delete
      </Button>
    </form>
  );
}
