import { z } from "zod";

export const categories = [
  "Product",
  "Service",
  "Support",
  "Security",
  "Other",
];
export const priorities = ["Low", "Medium", "High"];

export const complaintSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
  description: z.string().min(4, { message: "Description is required." }),
  category: z
    .enum(categories as [string, ...string[]])
    .default("Product")
    .refine((val) => !!val, { message: "A category must be selected" }),
  priority: z
    .enum(priorities as [string, ...string[]])
    .default("Low")
    .refine((val) => !!val, { message: "A priority must be selected" }),
});

export const adminComplaintSchema = complaintSchema.extend({
  status: z.enum(["Pending", "In Progress", "Resolved"]).default("Pending"),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const registerSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
