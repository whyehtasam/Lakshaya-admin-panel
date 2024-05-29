import Dashboard from "./apps/dashboard/Dashboard";
import Navbar from "./apps/header/Navbar";
import Sidebar from "./apps/sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex bg-slate-50">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
