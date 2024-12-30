import mongoose from "mongoose";
import Task from "../models/task.model.js";

// Fetch all tasks
// export const getTasks = async (req, res) => {
//   try {
//     const { status_id } = req.query;

//     let filter = {};

//     // If status_id is 0, fetch tasks with status_id 2 and 3 for the dashboard
//     if (status_id === "0") {
//       filter = { status_id: { $in: [2, 3] } };
//     } else if (status_id) {
//       // If a specific status_id is provided, create the filter
//       filter = { status_id };
//     }

//     // Fetch tasks based on the filter
//     const tasks = await Task.find(filter);
//     res.status(200).json({ success: true, data: tasks });
//   } catch (error) {
//     console.error("Error in fetching tasks", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Error in fetching tasks" });
//   }
// };
export const getTasks = async (req, res) => {
  try {
    const { status_id } = req.query;

    let filter = {};

    // If status_id is 0, fetch tasks with status_id 2 and 3 for the dashboard
    if (status_id === "0") {
      filter = { status_id: { $in: [2, 3] } };
    } else if (status_id) {
      // If a specific status_id is provided, create the filter
      filter = { status_id };
    }

    // Fetch tasks based on the filter
    const tasks = await Task.find(filter);

    // Check for tasks with status_id=2 and past due_time
    const currentTime = new Date();
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        if (task.status_id === 2 && new Date(task.due_date) < currentTime) {
          await updateTask(
            { params: { id: task._id }, body: { status_id: 3 } },
            { json: () => {} } // Dummy res object for updateTask
          );
          task.status_id = 3; // Update task locally
        }
        return task;
      })
    );

    res.status(200).json({ success: true, data: updatedTasks });
  } catch (error) {
    console.error("Error in fetching tasks", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching tasks" });
  }
};


export const createTask = async (req, res) => {
  const { title, description, due_date, assigned_user_id, priority_id } =
    req.body;

  // Validate required fields
  if (!title || !description || !assigned_user_id || !priority_id) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  // Calculate status_id based on due_date
  let status_id;
  const nodate = new Date(0);
  if (due_date == nodate.toISOString()) {
    status_id = "1"; // No due date
  } else {
    const currentDate = new Date();
    const dueDate = new Date(due_date);
    status_id = dueDate < currentDate ? "3" : "2"; // Past: 3, Future: 2
  }
  const newTask = new Task({
    title,
    description,
    due_date,
    assigned_user_id,
    priority_id,
    status_id,
  });

  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in creating new task", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }
      console.log(taskUpdates);

      if (Number(taskUpdates.status_id) !== 4 && Number(taskUpdates.status_id !== 5)&&taskUpdates.due_date) {
        const newDueDate = new Date(taskUpdates.due_date);
        const newStatus = getStatusFromDueDate(newDueDate);

        // Set status_id based on the new due_date
        taskUpdates.status_id = newStatus;
        console.log("here");
      }


  try {
    console.log(taskUpdates);
    const updatedTask = await Task.findByIdAndUpdate(id, taskUpdates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error in updating task", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status_id: 5 },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (error) {
    console.error("Error in deleting task", error.message);
    res.status(404).json({ success: false, message: "Task not found" });
  }
};
const getStatusFromDueDate = (dueDate) => {
  const currentTime = new Date();
  if (dueDate.toISOString() === new Date(0).toISOString()) {
    return 1; // No due date
  } else if (dueDate > currentTime) {
    return 2; // Future due date
  } else {
    return 3; // Past due date
  }
};
