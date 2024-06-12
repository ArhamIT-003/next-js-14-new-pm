import { getDataFromToken } from "@/helpers/getDataToken";
import { User } from "@/lib/models/User";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";
import { Project } from "@/lib/models/Project";

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();

    const user = await User.findById({ _id: userId })
      .select("-password")
      .populate("projects", "title state createdBy");

    console.log(user._doc);

    return NextResponse.json({
      mesaaage: "User found",
      data: user,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
