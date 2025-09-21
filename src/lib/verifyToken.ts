import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "admin" | "user";
    };
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
