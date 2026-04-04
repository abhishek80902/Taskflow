// src/components/ui/Card.jsx
export default function Card({ children }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">
      {children}
    </div>
  );
}