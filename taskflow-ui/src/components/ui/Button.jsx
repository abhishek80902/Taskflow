// src/components/ui/Button.jsx
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}