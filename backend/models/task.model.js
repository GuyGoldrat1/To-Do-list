import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    assigned_user_id: {
      type: Number,
      required: true,
    },
    priority_id: {
      type: Number,
      enum: [1, 2, 3, 4], // 1 – Low, 2 – Medium, 3 – High, 4 – Urgent
      required: true,
    },
    status_id: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // 1 – Draft, 2 – In Progress, 3 – On Hold, 4 – Completed, 5 – Deleted
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
