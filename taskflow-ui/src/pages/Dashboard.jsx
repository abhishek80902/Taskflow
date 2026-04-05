import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
  });

  const fetchTasks = async () => {
    try {
      let query = "";

      if (filters.category) query += `category=${filters.category}`;
      if (filters.tag) query += `${query ? "&" : ""}tags=${filters.tag}`;

      const res = await API.get(`/tasks?${query}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await API.patch(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* CREATE TASK */}
      <TaskModal refresh={fetchTasks} />

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Filter by category"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        />

        <input
          placeholder="Filter by tag"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setFilters({ ...filters, tag: e.target.value })
          }
        />
      </div>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleStatus}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}