// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={submit} className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-xl mb-6">Register</h2>

        <input placeholder="Email" className="w-full mb-4 p-2 bg-gray-800"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input type="password" placeholder="Password" className="w-full mb-4 p-2 bg-gray-800"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="w-full bg-indigo-600 p-2 rounded">Register</button>
      </form>
    </div>
  );
}