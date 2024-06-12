"use client";
import React, { useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { PlusIcon } from "@/app/assets/PlusIcon";
import { VerticalDotsIcon } from "@/app/assets/VerticalDotsIcon";
import { SearchIcon } from "@/app/assets/SearchIcon";
import { ChevronDownIcon } from "@/app/assets/ChevronDownIcon";
import { capitalize } from "@/lib/helper";
import Link from "next/link";
import GetAllProjectDetails from "@/app/hooks/projects/getProjects";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

const statusColorMap = {
  todo: "success",
  progress: "danger",
  completed: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "description",
  "state",
  "team",
  "actions",
];

const columns = [
  { uid: "title", name: "Title" },
  { uid: "description", name: "Description" },
  { uid: "state", name: "State" },
  { uid: "team", name: "Team" },
  { uid: "actions", name: "Actions" },
];

export default function ProjectTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const { data: fetchedProjectData, mutate } = GetAllProjectDetails();

  const data = useMemo(() => fetchedProjectData ?? [], [fetchedProjectData]);

  console.log(data);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/project/${id}`);
      mutate();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProjects = [...data];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
        project.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredProjects = filteredProjects.filter(
        (project) => project.state === statusFilter
      );
    }

    return filteredProjects;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((project, columnKey) => {
    const cellValue = project[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div>
            <p className="text-default-700">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-700">
              {cellValue.slice(0, 80)}
            </p>
          </div>
        );
      case "state":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "team":
        return (
          <div className="flex gap-4">
            {project.team.map((member) => (
              <div
                key={member._id}
                className="flex flex-wrap items-center gap-2 text-xs capitalize text-default-700"
              >
                <Popover key={member} placement="top" color="foreground">
                  <PopoverTrigger>
                    <Button color="secondary" size="sm" className="capitalize">
                      <FaUserAlt size={12} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        {member?.username}
                      </div>
                      <div className="text-tiny">{member?.email}</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="bordered">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu color="primary">
                <DropdownItem
                  as={Link}
                  href={`/dashboard/project/${project._id}`}
                  className="text-primary"
                  color="primary"
                >
                  View
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href={`/dashboard/project/update/${project._id}`}
                  className="text-success"
                  color="success"
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  onClick={() => deleteHandler(project._id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex text-default">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Filter Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="capitalize text-black"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              as={Link}
              href="/dashboard/project/add"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.length} projects
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    data.length,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <div className="hidden sm:flex w-[30%] justify-center gap-4">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            color="primary"
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            color="primary"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// <Dropdown>
//               <DropdownTrigger className="hidden sm:flex text-default">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {Object.keys(statusColorMap).map((status) => (
//                   <DropdownItem key={status} className="capitalize text-black">
//                     {capitalize(status)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
