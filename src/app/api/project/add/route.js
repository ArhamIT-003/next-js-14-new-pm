import {Project} from "@/lib/models/Project";
import { User } from "@/lib/models/User";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, description, state, assignedTo, createdBy } =
      await request.json();

    await connectToDb();

    console.log(name, description, state, assignedTo, createdBy);

    const data = await Project.create({
      title: name,
      description,
      state,
      team: assignedTo ? assignedTo : [],
      createdBy,
    });

    for (const userId of assignedTo) {
      await User.findByIdAndUpdate(userId, {
        $push: { projects: data._id },
      });
    }

    return NextResponse.json(
      {
        message: "Project added successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
