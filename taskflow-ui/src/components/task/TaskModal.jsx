import { useState } from "react";
import API from "../../api/axios";

export default function TaskModal({ refresh }) {
  const [title, setTitle] = useState("");

  const createTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    refresh();
  };

  return (
    <div className="flex gap-4 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="p-3 bg-gray-800 rounded w-full"
      />
      <button onClick={createTask} className="bg-indigo-500 px-4 rounded">
        Add
      </button>
    </div>
  );
}