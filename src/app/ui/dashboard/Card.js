import React, { Fragment } from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

const Card = ({ projects }) => {
  // Initialize the count for each task state
  const taskCounts = {
    "To-Do": 0,
    "In Progress": 0,
    Completed: 0,
  };

  // Map state values from the data to the ones used in the component
  const stateMapping = {
    "todo": "To-Do",
    "in progress": "In Progress",
    completed: "Completed",
  };

  // Count the tasks based on their state
  projects?.forEach((project) => {
    const state = stateMapping[project.state.toLowerCase()];
    if (state) {
      taskCounts[state]++;
    }
  });

  // Prepare the data to display
  const data = [
    {
      name: "To-Do",
      value: taskCounts["To-Do"],
    },
    {
      name: "In Progress",
      value: taskCounts["In Progress"],
    },
    {
      name: "Completed",
      value: taskCounts["Completed"],
    },
  ];

  return (
    <Fragment>
      {data.map((task) => (
        <div
          key={task}
          className={`rounded-[10px] p-5 flex gap-5 cursor-pointer bg-[#23574a]`}
        >
          <MdSupervisedUserCircle size={20} />
          <div className={`flex flex-col gap-5`}>
            <span className="totalUser">{task.name}</span>
            <span className="totalNumber">{task.value}</span>
            <span className={`text-sm font-normal`}>
              <span className={`text-lime-500`}>12% </span>
              <span>more than previous week</span>
            </span>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Card;
