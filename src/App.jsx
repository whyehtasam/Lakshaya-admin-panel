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
        <Sidebar className='h-full hidden sm:grid'/>
        {/* <Routes> */}
          <Dashboard className='h-full'/>
        {/* </Routes> */}
      </div>
    </Router>
  );
}

export default App;
