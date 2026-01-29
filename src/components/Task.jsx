import { useState, useEffect } from "react";
import TaskList from "./Tasklist";
import { getTasks, createTask, updateTask, deleteTask } from "../api/mockTasksApi";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

// load task
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Add task
  async function handleAddTask() {
    if (!title.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const newTask = await createTask({
        title,
        description,
        status,
        priority,
      });
      setTasks((prev) => [...prev, newTask]);

      // Reset form
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
    } catch {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  // Update task
  async function handleTaskUpdate(id, field, value) {
    try {
      const updated = await updateTask(id, { [field]: value });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch {
      setError("Failed to update task");
    }
  }

  // Delete task
  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <section className="max-w-lg w-full bg-[#102b2b] py-8 shadow-xl rounded-lg">
        <h1 className="text-center text-[#f9fafb] font-bold text-lg mb-4">
          Task Manager App
        </h1>

        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Add Task Form */}
        <div className="space-y-2">
          <div className="flex gap-3 px-4">
            <input
              placeholder="Enter a task title"
              className="flex-1 px-4 py-2 text-sm text-white bg-[#2c3a3a] rounded-md focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Status dropdown */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#2c3a3a] text-sm text-white rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Priority dropdown */}
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[#2c3a3a] text-sm text-white rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="px-4">
            <textarea
              placeholder="Task description (optional)"
              className="w-full text-sm px-4 py-1 text-white bg-[#2c3a3a] rounded-md focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end px-4">
            <button
              disabled={loading}
              onClick={handleAddTask}
              className="bg-[#2c8c86] py-2 px-6 text-sm text-white rounded-md"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          handleTaskUpdate={handleTaskUpdate}
          handleDelete={handleDelete}
        />
      </section>
    </main>
  );
}
