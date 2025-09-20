"use client";

import { useUserStore } from "@/store/user";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      clearUser();
      router.push("/login");
    }
  };
  return (
    <div>
      {user ? (
        <>
          {user.role === "admin" && (
            <Link className="mr-2" href={"/dashboard"}>
              Dashboard
            </Link>
          )}
          <Button onClick={handleLogout} variant={"destructive"}>
            Logout
          </Button>
        </>
      ) : (
        <Link href={"/login"}>login</Link>
      )}
    </div>
  );
}
