"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categories,
  complaintSchema as formSchema,
  priorities,
} from "@/lib/formSchemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { SelectList } from "../SelectList";
import { RadioList } from "../RadioList";
import { useRouter } from "next/navigation";

export function ComplaintForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Product",
      priority: "Low",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/complaint", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert("Complaint submitted successfully");
      router.push("/");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 mx-auto max-w-2xl p-6 ring ring-zinc-200 rounded-lg"
    >
      <div>
        <h1 className="text-lg font-semibold">Create a new Complaint</h1>
        <p className="text-zinc-400 text-xs font-normal">
          Fill the form completely to create a new Complaint, every field is
          required
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="title">
          Title
        </label>
        <Input type="text" id="title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="category">
          Category
        </label>
        <SelectList
          name="category"
          control={control}
          title="Category"
          data={categories}
        />
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="priority">
          Priority
        </label>
        <RadioList control={control} name="priority" data={priorities} />
        {errors.priority && (
          <p className="text-red-500 text-xs">{errors.priority.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="description">
          Description
        </label>
        <Textarea
          className="min-h-[100px]"
          id="description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
}
