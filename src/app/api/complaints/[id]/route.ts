import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Complaint } from "@/models/Complaint";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const token = (await headers()).get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token!);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const complaint = await Complaint.findById(new mongoose.Types.ObjectId(id));
    return NextResponse.json({ complaint }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching complaints" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token!);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { adminComplaintSchema } = await import("@/lib/formSchemas");
    const parsed = adminComplaintSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const prev = await Complaint.findById(new mongoose.Types.ObjectId(id), {
      status: 1,
    });
    if (!prev) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }
    const complaint = await Complaint.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: parsed.data }
    );
    if (prev.status !== parsed.data.status) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const admins = await User.find({ role: "admin" });

      const { statusUpdateMailTemplate } = await import("@/lib/mailTemplates");

      for (const admin of admins) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: admin.email,
          subject: "New complaint submitted",
          html: statusUpdateMailTemplate(parsed.data),
        });
      }
    }
    return NextResponse.json(
      { message: "Complaint updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error updating complaint" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const token = (await headers()).get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token!);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const complaint = await Complaint.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );
    if (!complaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Complaint deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error deleting complaint" },
      { status: 500 }
    );
  }
}
