import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <button onClick={logout} className="text-red-400">
        Logout
      </button>
    </div>
  );
}