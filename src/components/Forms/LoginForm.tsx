"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema as formSchema } from "@/lib/formSchemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      router.push("/dashboard");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 mx-auto max-2xl p-6 ring ring-zinc-200 rounded-lg"
    >
      <div>
        <h1 className="text-lg font-semibold">Login to your account</h1>
        <p className="text-zinc-400 text-xs font-normal">
          Enter your email and password below to login to your account
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="email">
          Email
        </label>
        <Input type="email" id="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor="password">
          Password
        </label>
        <Input type="password" id="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      <Button className="w-full" type="submit">
        Login
      </Button>
      <p className="text-center text-xs">
        Don&apos;t have an account?{" "}
        <span>
          <Link className="underline" href="/register">
            Register
          </Link>
        </span>
      </p>
    </form>
  );
}
