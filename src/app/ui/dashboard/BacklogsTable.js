"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Button,
} from "@nextui-org/react";

import Link from "next/link";
import { GetAllBacklogs } from "@/app/hooks/backlogs/getBacklogs";
import axios from "axios";
import toast from "react-hot-toast";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "requirement",
    label: "REQUIREMENT",
  },
  {
    key: "isActive",
    label: "IS-ACTIVE",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export default function BacklogsTable() {
  const [selectionBehavior, setSelectionBehavior] = React.useState("replace");

  const { backlogs, setBacklogs } = GetAllBacklogs();

  const data = useMemo(() => backlogs ?? [], [backlogs]);

  console.log(data);

  async function deleteHandler(id) {
    try {
      console.log(id);
      await axios.delete(`/api/backlogs/${id}`);

      toast.success("Backlog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = getKeyValue(item, columnKey);

    switch (columnKey) {
      // ... (cases for 'name' and 'actions' remain the same) ...
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-700">
              {cellValue}
            </p>
          </div>
        );
      case "requirement":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-700">
              {cellValue.slice(0, 50)}
            </p>
          </div>
        );
      case "isActive":
        return (
          <Chip
            className="capitalize"
            color={cellValue ? "success" : "danger"} // Assuming true is active, false is inactive
            size="sm"
            variant="flat"
          >
            {cellValue ? "true" : "false"}
          </Chip>
        );
      case "actions":
        return (
          <Chip className="capitalize" size="lg" color="text-white">
            <div className="flex gap-4 items-center">
              <Button
                color="success"
                as={Link}
                href={`/dashboard/backlogs/${item._id}`}
              >
                View
              </Button>
              <Button color="danger" onClick={() => deleteHandler(item._id)}>
                Delete
              </Button>
            </div>
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Selection behavior table example with dynamic content"
        selectionMode="multiple"
        selectionBehavior={selectionBehavior}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
