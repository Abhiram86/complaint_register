"use client";
import { handleDeleteComplaint } from "@/actions/dashboard";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import SubmitButton from "./SubmitButton";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const handleSumbit = async () => {
    setLoading(true);
    try {
      await handleDeleteComplaint(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action={handleSumbit}>
      <SubmitButton
        className="hover:bg-red-500 hover:text-white"
        text="Delete"
        loading={loading}
      />
    </form>
  );
}
