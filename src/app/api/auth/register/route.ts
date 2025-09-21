import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { registerSchema } = await import("@/lib/formSchemas");
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const { username, email, password } = parsed.data;
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET!
    );
    await user.save();
    (await cookies()).set("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return NextResponse.json(
      { user: { id: user._id, username, email, role: "user" } },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
