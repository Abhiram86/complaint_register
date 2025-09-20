"use client";

import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (!response.ok) {
          console.log("login error", response);
          return;
        }
        const data = await response.json();
        setUser(data.user);
        console.log("login success", data);
      } catch (error) {
        console.log("login error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div>
      {loading ? (
        <p className="text-center mt-20 text-lg font-bold">Loading...</p>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
