# To-Do List Application

This is a full-stack to-do list application built with **React.js** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** for the database. The application allows users to manage their tasks with various features, such as creating, editing, deleting, and filtering tasks based on their status.

## Features

- **Task Management:** Users can add, edit (optional), and delete tasks.
- **Task Status:** Tasks can have different statuses:
    - **Draft**: No assigned due date.
    - **In Progress**: Task is being worked on and the due date has not passed.
    - **On Hold**: The task's due date has passed but is not completed yet.
    - **Completed**: Task is finished.
    - **Deleted**: Task is removed from the list.
- **Filtering Tasks:** The sidebar allows users to filter tasks by their status.
- **Dashboard View:** The dashboard will show only **On Hold** or **In Progress** tasks.
- **Task Creation:** Tasks can be created from the **Create** button at the top-right of the screen.

## Data Model

The application uses a MongoDB database to store tasks. Each task has the following fields:

- **task_id** (integer): Unique identifier for the task.
- **title** (string): Title of the task.
- **description** (string): Description of the task.
- **due_date** (timestamp): Due date for the task.
- **assigned_user_id** (integer): The ID of the user assigned to the task.
- **priority_id** (integer): Priority level of the task (1 – Low, 2 – Medium, 3 – High, 4 – Urgent).
- **status_id** (integer): Status of the task (1 – Draft, 2 – In Progress, 3 – On Hold, 4 – Completed, 5 – Deleted).

## Tech Stack

- **Frontend:** React.js with Chakra UI
- **Backend:** Node.js with Express
- **Database:** MongoDB

## Installation


1. **Clone the repository:**
    
    ```bash
    git clone https://github.com/GuyGoldrat1/To-Do-list.git
    cd To-Do-list
    npm install
    cd frontend
    npm install
    cd ..
    npm run dev
    ```
    
    
2. Open your browser and go to `http://localhost:5173` to see the app in action.

## Future Features

Here are some features I plan to add in the future:

1. **User Authentication**  
   - Allow users to sign up and log in to manage their own tasks.

2. **Task Pagination**  
   - Improve performance by adding pagination to load tasks faster.

3. **Search and Priority Filter**  
   - Add a search feature to find tasks by content and a filter to sort tasks by priority.

These features will be added in future updates to improve the app.

