import { User } from "@/lib/models/User";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(request, { params: { userId } }) {
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: userId });

    if (!deleteUser) {
      return NextResponse.json(
        { message: "No user found with this id" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { userId } }) {
  try {
    // await connectToDb();
    const { username, email, password, role, isActive } = await request.json();

    // console.log(username, email, password, role, isActive);

    const updateUser = {};

    if (username.length > 0) updateUser.username = username;
    if (email.length > 0) updateUser.email = email;
    if (password.length > 0)
      updateUser.password = await bcrypt.hash(password, 10);

    if (role.length > 0) updateUser.role = role;
    if (isActive != null)
      updateUser.isActive = isActive == "true" ? true : false;

    // console.log(updateUser, userId);

    await User.findByIdAndUpdate(
      userId,
      { $set: updateUser },
      { new: true, runValidators: true } // Return updated doc, validate input
    );

    return NextResponse.json({ message: "User Updated Sucessfully" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request, { params: { userId } }) {
  try {
    await connectToDb();
    const singleUser = await User.findById({ _id: userId });
    if (!singleUser) {
      return NextResponse.json(
        { message: "No user found with this id" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Single User retrieved!", data: singleUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
