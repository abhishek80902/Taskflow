import { useState } from "react";
import API from "../../api/axios";

export default function TaskModal({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    tags: ""
  });

  const createTask = async () => {
    if (!form.title) return;

    await API.post("/tasks", {
      ...form,
      tags: form.tags.split(",").map(t => t.trim())
    });

    setForm({
      title: "",
      description: "",
      dueDate: "",
      category: "",
      tags: ""
    });

    refresh();
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl mb-6 space-y-3">

      <h2 className="text-lg font-semibold">Create Task</h2>

      <input
        placeholder="Title"
        className="w-full p-2 bg-gray-800 rounded"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Description"
        className="w-full p-2 bg-gray-800 rounded"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="datetime-local"
        className="w-full p-2 bg-gray-800 rounded"
        value={form.dueDate}
        onChange={(e) =>
          setForm({ ...form, dueDate: e.target.value })
        }
      />

      <input
        placeholder="Category"
        className="w-full p-2 bg-gray-800 rounded"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <input
        placeholder="Tags (comma separated)"
        className="w-full p-2 bg-gray-800 rounded"
        value={form.tags}
        onChange={(e) =>
          setForm({ ...form, tags: e.target.value })
        }
      />

      <button
        onClick={createTask}
        className="bg-indigo-600 px-4 py-2 rounded w-full"
      >
        Create Task
      </button>
    </div>
  );
}