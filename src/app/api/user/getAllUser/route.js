import { User } from "@/lib/models/User";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();

    const allUser = await User.find().select("-password");
    return NextResponse.json({ message: "All User Data", data: allUser });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
