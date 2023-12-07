"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState();
  const [detail, setDetail] = useState();
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { task, detail };
      setMainTask(updatedTasks);

      //remove editIndex after editing
      setEditIndex(null);
    } else {
      // Otherwise, add a new task
      setMainTask([...mainTask, { task, detail }]);
    }

    // setMainTask([...mainTask, { task, detail }]);
    setTask("");
    setDetail("");
  };

  const delTask = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const editTask = (i) => {
    if (mainTask[i]) {
      // Set the task and detailription for editing
      setTask(mainTask[i].task);
      setDetail(mainTask[i].detail);
      setEditIndex(i);
    } else {
      console.error("Invalid task index or task does not exist.");
    }
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li
          key={index}
          className="list-none mb-6 flex justify-center items-between ">
          <div className="flex flex-col sm:flex-row  items-center justify-between mb-5 w-2/3">
            <div className="flex  mb-4 gap-x-10  sm:gap-x-32">
              <h6 className="text-lg font-semibold text-gray-600">
                {index + 1}
              </h6>
              <h5 className="text-lg font-semibold text-gray-600">
                {task.task}
              </h5>
              <h5 className="text-lg font-semibold text-gray-600">
                {task.detail}
              </h5>
            </div>
            <div className="flex">
              <button
                onClick={() => delTask(index)}
                className="bg-red-400 rounded text-white px-4 py-2 mr-3">
                Delete
              </button>
              <button
                onClick={() => editTask(index)}
                className="bg-blue-400 rounded text-white px-4 py-2 ">
                Edit
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  return (
    <div className=" max-w-7xl mx-auto lg:w-screen-2xl">
      <div className=" flex flex-col justify-center items-center h-24 bg-purple-400 border">
        <h1 className="text-3xl font-serif font-bold">My Todos List</h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center max-sm:max-auto">
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          placeholder="Enter Task Here"
          className="text-2xl border-zinc-700 px-3 py-2 border-2 m-8"
        />
        <input
          type="text"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          placeholder="Enter Description Here"
          className="flex justify-center items-center text-2xl border-zinc-700 px-3 py-2 border-2 m-8"
        />
        <button className="bg-black  m-5 border-2  text-xl font-bold rounded w-32 px-3  py-3 text-white ">
          Add Task
        </button>
      </form>
      <hr />

      <div className="p-8 bg-slate-200">{renderTask}</div>
    </div>
  );
};

export default TodoList;
