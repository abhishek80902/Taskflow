// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
        TaskFlow
      </h1>

      <p className="mt-4 text-gray-400">
        A modern task management system
      </p>

      <div className="mt-8 flex gap-4">
        <button onClick={()=>navigate("/login")} className="px-6 py-3 bg-indigo-600 rounded-lg">
          Login
        </button>

        <button onClick={()=>navigate("/register")} className="px-6 py-3 border border-gray-700 rounded-lg">
          Get Started
        </button>
      </div>

    </div>
  );
}