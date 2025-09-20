import connectDB from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
