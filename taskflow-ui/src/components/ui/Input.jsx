// src/components/ui/Input.jsx
export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 outline-none"
    />
  );
}