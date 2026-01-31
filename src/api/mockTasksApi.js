import TODO_API_URL from "../config"

let mockTasks = [
  {
    _id: "1",
    title: "Sample task",
    description: "task description",
    status: "pending",
    priority: "medium",
  },
];
// getTasks/GET
export function getTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTasks);
    }, 800);
  });
}


// create/POST
export function createTask(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = { ...task, _id: Date.now().toString() };
      mockTasks = [...mockTasks, newTask];
      resolve(newTask);
    }, 600);
  });
}

// update/PUT
export function updateTask(id, updates) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks = mockTasks.map((t) =>
        t._id === id ? { ...t, ...updates } : t,
      );
      resolve(mockTasks.find((t) => t._id === id));
    }, 500);
  });
}
// delete/DELETE
export function deleteTask(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks = mockTasks.filter((t) => t._id !== id);
      resolve(id);
    }, 500);
  });
}
