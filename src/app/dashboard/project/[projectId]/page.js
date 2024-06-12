"use client";
import { GetProject } from "@/app/hooks/projects/getProjects";
import { Progress } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";

export default function SingleProjectPage({ params: { projectId } }) {
  const { data, loading } = GetProject(projectId);

  console.log(projectId);

  console.log(data);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children with 0.2s delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const statusColorMap = {
    todo: "success",
    "in-progress": "primary",
    completed: "warning",
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="data-container p-4 space-y-6 bg-white text-gray-800 rounded-lg shadow-md" // Tailwind classes
    >
      <motion.div variants={itemVariants} className="font-normal mb-2">
        <motion.span
          variants={itemVariants}
          className="bg-secondary text-white font-medium p-2 rounded mr-4"
        >
          Project Id
        </motion.span>
        <motion.span className="font-semibold">{data?._id}</motion.span>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <motion.div variants={itemVariants} className="text-xl mb-2">
          <motion.span
            variants={itemVariants}
            className="bg-secondary text-white text-medium font-semibold p-2 rounded mr-4"
          >
            Project Name
          </motion.span>
          <motion.span className="font-semibold"> {data?.title}</motion.span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className={`capitalize bg-primary-400 text-white p-2 rounded-md
          }`}
        >
          {data?.state}
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="max-w-fit bg-secondary text-white text-medium font-semibold p-2 rounded mr-4"
      >
        Description
      </motion.div>
      <motion.div variants={itemVariants} className="text-gray-600 mb-2">
        <p>{data?.description}</p>
      </motion.div>
      <div className="flex justify-between space-x-4 mb-4">
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <div className="flex space-x-2">
            {data?.team.map((member) => (
              <div key={member}>
                <FaUserAlt size={14} />
                <div className="flex gap-4 items-center">
                  <p className="text-sm">{member?.username}</p>
                  <p className="text-xs">({member?.role})</p>
                </div>
                <p className="text-sm">{member?.email}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-2">
            Created By: {data?.createdBy}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
}
