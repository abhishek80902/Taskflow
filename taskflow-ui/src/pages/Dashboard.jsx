import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      description: "New task",
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl mb-6">Your Tasks</h1>

      {/* Create Task */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="p-3 bg-gray-800 rounded w-full"
        />
        <button
          onClick={createTask}
          className="bg-indigo-600 px-5 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-900 p-4 rounded flex justify-between"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}