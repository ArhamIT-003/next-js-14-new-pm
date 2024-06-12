import { Backlogs } from "@/lib/models/Backlogs";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();
    const allBacklogs = await Backlogs.find();
    return NextResponse.json({
      message: "All backlogs Data",
      data: allBacklogs,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
