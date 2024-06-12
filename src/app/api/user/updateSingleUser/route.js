import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { getDataFromToken } from "@/helpers/getDataToken";
import { connectToDb } from "@/lib/utlis";
import bcrypt from "bcryptjs";

export async function PUT(request) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDb(); // Ensure database connection

    const { username, email, password, role, active } = await request.json();

    const updatedFile = {};

    if (username) updatedFile.username = username;
    if (email) updatedFile.email = email;
    if (password) updatedFile.password = await bcrypt.hash(password, 10);
    if (role) updatedFile.role = role;
    if (active) updatedFile.active = active == "true" ? true : false;

    // encrypt the password

    // const hashedPassword = await bcrypt.hash(password, 10);

    // Update User Record
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFile },
      { new: true, runValidators: true } // Return updated doc, validate input
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User settings changed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error); // Log error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
