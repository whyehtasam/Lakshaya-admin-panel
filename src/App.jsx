import LoginForm from "./apps/authentication/Authentication";
import Dashboard from "./apps/dashboard/Dashboard";
import Navbar from "./apps/header/Navbar";
import Sidebar from "./apps/sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex bg-slate-50 h-[calc(92.2vh)]">
        <Sidebar className="h-full hidden sm:grid" />

        <Dashboard className="h-full" />
      </div>
      {/* <div className="h-[90vh] flex justify-center items-center">
        <LoginForm />
      </div> */}
    </Router>
  );
}

export default App;
