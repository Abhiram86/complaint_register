"use client";
import { handleDeleteComplaint } from "@/actions/dashboard";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const handleSumbit = async () => {
    setLoading(true);
    try {
      await handleDeleteComplaint(id);
      toast("Complaint deleted successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action={handleSumbit}>
      <SubmitButton
        className="hover:bg-red-500 hover:text-white"
        text="Delete"
        variant="ghost"
        loading={loading}
      />
    </form>
  );
}
