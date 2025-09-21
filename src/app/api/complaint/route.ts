import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Complaint } from "@/models/Complaint";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token!);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const complaint = new Complaint({
      ...body,
      user: new mongoose.Types.ObjectId(decoded.id),
    });
    await complaint.save();
    return NextResponse.json(
      { message: "Complaint submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error submitting complaint" },
      { status: 500 }
    );
  }
}
