import { Project } from "@/lib/models/Project";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();
    const allProject = await Project.find().populate(
      "team",
      "username email" // Select only specific user fields
    );

    return NextResponse.json(
      {
        message: "All Projects",
        data: allProject,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
