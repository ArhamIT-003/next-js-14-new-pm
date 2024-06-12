import { Project } from "@/lib/models/Project";
import { connectToDb } from "@/lib/utlis";
import { NextResponse } from "next/server";

export async function GET(request, { params: { projectId } }) {
  try {
    await connectToDb();

    const singleProject = await Project.findById({ _id: projectId }).populate(
      "team",
      "username email role" // Select only specific user fields
    );
    if (!singleProject) {
      return NextResponse.json(
        { message: "No project found!" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Project found!", data: singleProject },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { projectId } }) {
  try {
    await connectToDb();
    const deleteProject = await Project.findByIdAndDelete({ _id: projectId });
    if (!deleteProject) {
      return NextResponse.json(
        { message: "No project found with this id" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Project data successfully",
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

export async function PUT(request, { params: { projectId } }) {
  try {
    // await connectToDb();
    const { name, description, state, assignedTo } = await request.json();

    console.log(name, description, state, assignedTo);

    const updateProject = {};

    if (name) updateProject.title = name;
    if (description) updateProject.description = description;
    if (state) updateProject.state = state;
    if (assignedTo) updateProject.team = assignedTo;

    const pro = await Project.findByIdAndUpdate(projectId, {
      $set: updateProject,
    });

    console.log(pro);
    return NextResponse.json(
      { message: "Project Updated Sucessfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
