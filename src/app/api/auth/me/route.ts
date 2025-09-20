import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
