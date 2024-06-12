import { Backlogs } from "@/lib/models/Backlogs";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { backlogId } = params;

  try {
    await connectToDb();

    const singleBacklog = await Backlogs.findOne({ _id: backlogId });

    if (!singleBacklog) {
      return NextResponse.json({
        message: "No backlog found with this id",
      });
    }

    return NextResponse.json({
      message: "Single Backlog retrieved!",
      data: singleBacklog,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { backlogId } }) {
  try {
    await connectToDb();

    const deleteBacklog = await Backlogs.findByIdAndDelete({ _id: backlogId });

    if (!deleteBacklog) {
      return NextResponse.json(
        { message: "No backlog found with this id" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Backlog deleted successfully!" },
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
