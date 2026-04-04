export default function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-400 text-sm">{task.description}</p>

      <div className="flex justify-between mt-4">
        <span className="text-yellow-400">{task.status}</span>
        <button onClick={() => onDelete(task._id)} className="text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}