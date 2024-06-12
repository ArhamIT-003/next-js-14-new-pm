import { connectToDb } from "@/lib/utlis";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    console.log(email, password);

    await connectToDb();

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return NextResponse.json({ error: "NO user found!" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 401 });
    }

    const tokenData = {
      id: userFound._id,
      email: userFound.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
      },
      { status: 201 }
    );
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
