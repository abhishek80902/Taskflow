export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-indigo-500 transition">

      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-400 text-sm">{task.description}</p>

      {/* CATEGORY */}
      <p className="text-indigo-400 text-xs mt-2">
        {task.category || "General"}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-2">
        {task.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-800 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* DUE DATE */}
      {task.dueDate && (
        <p className="text-xs text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleString()}
        </p>
      )}

      <div className="flex justify-between items-center mt-4">

        {/* STATUS */}
        <button
          onClick={() => onToggle(task)}
          className={`text-sm px-3 py-1 rounded ${
            task.status === "completed"
              ? "bg-green-600"
              : "bg-yellow-600"
          }`}
        >
          {task.status}
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}