import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}