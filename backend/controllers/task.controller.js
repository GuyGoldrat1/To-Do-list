import mongoose from "mongoose";
import Task from "../models/task.model.js";

// Fetch all tasks
export const getTasks = async (req, res) => {
  try {
    const { status_id } = req.query;

    // If no status_id is provided, get all tasks
    const filter = status_id ? { status_id } : {};

    // Fetch tasks based on the filter
    const tasks = await Task.find(filter);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error in fetching tasks", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching tasks" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const {
    title,
    description,
    due_date,
    assigned_user_id,
    priority_id,
    status_id,
  } = req.body;

  if (
    !title ||
    !description ||
    !due_date ||
    !assigned_user_id ||
    !priority_id ||
    !status_id
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
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

  try {
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
