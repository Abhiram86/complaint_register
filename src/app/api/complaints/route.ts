import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Complaint } from "@/models/Complaint";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const priorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

const statusOrder = {
  Pending: 1,
  "In Progress": 2,
  Resolved: 3,
};

export async function GET(req: NextRequest) {
  await connectDB();
  console.log("headers", (await headers()).get("authorization"));
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
    const sortBy = req.nextUrl.searchParams.get("sortBy");
    const order = req.nextUrl.searchParams.get("order");
    const sortOrder = order === "asc" ? 1 : -1;

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          priorityScore: {
            $toInt: {
              $arrayElemAt: [
                Object.values(priorityOrder),
                { $indexOfArray: [Object.keys(priorityOrder), "$priority"] },
              ],
            },
          },
          statusScore: {
            $toInt: {
              $arrayElemAt: [
                Object.values(statusOrder),
                { $indexOfArray: [Object.keys(statusOrder), "$status"] },
              ],
            },
          },
        },
      },
      {
        $sort: {
          [sortBy === "priority"
            ? "priorityScore"
            : sortBy === "status"
            ? "statusScore"
            : "dateSubmitted"]: sortOrder,
        },
      },
      {
        $project: {
          priorityScore: 0,
          statusScore: 0,
        },
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const complaints = await Complaint.aggregate(pipeline as any);

    return NextResponse.json({ complaints }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching complaints" },
      { status: 500 }
    );
  }
}

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
    const { complaintSchema } = await import("@/lib/formSchemas");
    const parsed = complaintSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const complaint = new Complaint({
      ...parsed.data,
      user: new mongoose.Types.ObjectId(decoded.id),
    });
    await complaint.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const admins = await User.find({ role: "admin" });

    const { newComplainMailTemplate } = await import("@/lib/mailTemplates");

    for (const admin of admins) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: "New complaint submitted",
        html: newComplainMailTemplate(complaint),
      });
    }

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
