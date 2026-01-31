Task Manager App (Frontend)

A simple React-based task manager application that allows users to create, update, and delete tasks.
The app currently uses a mock API to simulate backend operations and is structured to easily switch to a real API later.

<!-- App Features -->

-Create tasks with:

        -Title

        -Description

        -Status (Pending, In Progress, Done)

        -Priority (Low, Medium, High)

-Update task status and priority using dropdowns

-Delete tasks

-Loading and error states

-Clean, responsive UI styled with Tailwind CSS

-Mock API layer that simulates real network requests

<!-- How to install and run the app (npm install, npm start). -->

perequisites:

1. Node.js (v16 or higher recommended)

2. npm

Steps:

1. Clone the repository:

-git clone https://github.com/zainabometere621/task-manager-app.git

2. Navigate into the project folder:

-cd my-todo-app

3. Install dependencies:

-npm install

4. Start the development server:

npm run dev

<!-- How to configure the API base URL (or how to enable mock mode). -->

API Base URL

The API base URL is stored in a single config file for easy updates.

File: src/config.js

Example:

const TODO_API_URL = "http://localhost:5000/api";
export default TODO_API_URL;

This allows switching between environments (mock, local backend, or production) by changing the value in one place.

Mock API Mode: this is its current setup

The app currently uses a mock API located at:

src/api/mockTasksApi.js

This file simulates backend behavior using:

-setTimeout to mimic network delay

-An in-memory array to store tasks

-Available mock API functions:

-getTasks() : Fetch all tasks

-createTask(task): Add a new task

-updateTask(id, updates): Update task status or priority

-deleteTask(id): Remove a task

<!-- What pages/components exist and what they do.-->

1. LandingPage (pages/LandingPage.jsx)

-The main entry page of the application

-Renders the main Task component

2. Task (components/Task.jsx)

-Core logic of the app

--Manages:

-Task state

-Loading and error handling

-API interactions (fetch, create, update, delete)

-Contains the task creation form

-Passes data and handlers to TaskList

3. TaskList (components/TaskList.jsx)

-Displays all tasks

--Allows:

-Updating task status

-Updating task priority

-Deleting tasks

-Receives data and handlers via props
