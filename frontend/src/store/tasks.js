import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  createTask: async (newTask) => {
    const {
      title,
      description,
      due_date,
      assigned_user_id,
      priority_id
    } = newTask;
    console.log(newTask);


    // Validate required fields
    if (
      !title ||
      !description ||
      !assigned_user_id ||
      !due_date ||
      !priority_id
    ) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      tasks: [...state.tasks, data.data],
    }));
    return { success: true, message: "Task created!" };
  },

  fetchTasks: async (statusId) => {
    const query = statusId ? `?status_id=${statusId}` : "";
    const res = await fetch(`/api/tasks${query}`);
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set({ tasks: data.data });
    return { success: true, message: "Tasks fetched successfully!" };
  },

  deleteTask: async (taskId) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== taskId),
    }));
    return { success: true, message: "Task deleted successfully!" };
  },

  updateTask: async (taskId, updatedTask) => {
          console.log(updatedTask, "store");

    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Update the UI immediately
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === taskId ? data.data : task
      ),
    }));

    return { success: true, message: "Task updated successfully!" };
  },
}));
