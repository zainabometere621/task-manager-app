export default function TaskList({ tasks, handleDelete, handleTaskUpdate }) {
  return (
    <div className="px-4 mt-4 space-y-2">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-[#3d4b4b] px-2 py-2 rounded-md text-[#e6f0f0] flex justify-between items-start"
        >
          <div>
            <p className="font-semibold text-center">{task.title}</p>

            <div className="flex gap-4">
              {/* status */}
              <select
                className="bg-[#2c3a3a] text-sm text-white rounded-md px-2 py-1 mt-1 focus:outline-none"
                value={task.status} 
                onChange={(e) =>
                  handleTaskUpdate(task._id, "status", e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              {/* priority */}
              <select
                className="bg-[#2c3a3a] text-sm text-white rounded-md px-2 py-1 mt-1 focus:outline-none"
                value={task.priority} 
                onChange={(e) =>
                  handleTaskUpdate(task._id, "priority", e.target.value)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {task.description && (
              <p className="text-sm text-gray-300 mt-1">
                {task.description}
              </p>
            )}
          </div>

          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-700 py-2 px-6 text-sm text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
