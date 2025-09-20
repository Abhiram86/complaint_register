"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  priority: z.string().min(1, {
    message: "Priority is required.",
  }),
});

export function ComplaintForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 mx-auto max-w-2xl p-6 ring ring-zinc-200 rounded-lg"
    >
      <div>
        <h1 className="text-lg font-semibold">Create a new Complaint</h1>
        <p className="text-zinc-400 text-xs font-normal">
          Fill the form to create a new complaint
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
        <Input type="text" id="category" {...register("category")} />
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="priority">
          Priority
        </label>
        <Input type="text" id="priority" {...register("priority")} />
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
