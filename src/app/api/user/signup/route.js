import { connectToDb } from "@/lib/utlis";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, role, isActive, password } = await request.json();

    console.log(username, email, password, role, isActive);

    await connectToDb();

    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      return NextResponse.json(
        {
          message: "A user is registered with this email or username!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      isActive,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 501 }
    );
  }
}
