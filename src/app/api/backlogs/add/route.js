import { Backlogs } from "@/lib/models/Backlogs";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, requirement, isActive } = await request.json();

    console.log(name, requirement, isActive);

    await connectToDb();

    if (!name || !requirement || isActive == null) {
      return NextResponse.json(
        {
          message: "Enter the valid data",
        },
        { status: 404 }
      );
    }

    const data = await Backlogs.create({
      name,
      requirement,
      isActive,
    });

    return NextResponse.json(
      { message: "Backlog created successfully", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
