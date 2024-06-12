"use client";
import { GetSingleBacklogs } from "@/app/hooks/backlogs/getBacklogs";
import { formatDate } from "@/lib/helper";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import React, { Fragment, useState } from "react";

export default function SingleBacklogPage({ params: { viewId } }) {
  const { backlog, loading, error } = GetSingleBacklogs(viewId);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loader, setLoader] = useState(false);

  const downloadPDF = async () => {
    const capture = document.querySelector(".pdf-file");
    setLoader(true);
    const options = {
      scale: 4, // Increase the scale for higher resolution (experiment to find a good balance)
      allowTaint: true, // Allow cross-origin images
      useCORS: true, // Use CORS for cross-origin images
      logging: true, // Enable logging for debugging (optional)
    };

    try {
      const canvas = await html2canvas(capture, options);
      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for better quality (optional)

      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const imgProps = doc.getImageProperties(imgData);
      const imgHeight = (imgProps.height * componentWidth) / imgProps.width;
      doc.addImage(imgData, "JPEG", 0, 0, componentWidth, imgHeight); // Adjust image type if using JPEG

      setLoader(false);
      doc.save("backlogs.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setLoader(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Fragment>
      <Card className="max-w-content pdf-file">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="flex gap-4 items-center">
                <h5 className="text-small tracking-tight text-default-700">
                  Name:
                </h5>
                <h4 className="text-medium font-semibold leading-none text-default-600">
                  {backlog.name}
                </h4>
              </div>
            </div>
          </div>
          <div className="space-x-4">
            <Button
              className={
                backlog.isActive
                  ? "bg-success text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="md"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {backlog.isActive ? "Active" : "Not-Active"}
            </Button>
            <Button
              color="primary"
              radius="full"
              size="md"
              variant={"solid"}
              onPress={downloadPDF}
              disabled={!(loader === false)}
            >
              {loader ? "Downloading..." : "Download"}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-medium text-default-900">
          <div className="flex flex-col gap-4">
            <p className="text-default-800 font-bold text-medium">
              Requirement:{" "}
            </p>
            <p className="pb-4">
              {loading ? "Loading ..." : backlog.requirement}
            </p>
          </div>
        </CardBody>
        <CardFooter className="gap-8">
          <div className="flex gap-4">
            <p className="text-default-800 text-medium">
              <span className="font-bold mr-4">Created At:</span>{" "}
              {loading ? "Loading ..." : formatDate(backlog.createdAt)}
            </p>
          </div>
          <div className="flex gap-4">
            <p className="text-default-800 text-medium">
              <span className="font-bold mr-4">Updated At:</span>
              {loading ? "Loading ..." : formatDate(backlog.updatedAt)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
