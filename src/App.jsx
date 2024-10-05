import { useEffect, useState } from "react";
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
  const [authenticated, setAuthenticated] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!authenticated) {
      fetch(backend_url + "/api/admin/authenticate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAuthenticated(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  
  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

const handleLogout = () => {
  localStorage.removeItem("token");
  setAuthenticated(false);
  window.location.reload();

}

  return (
    <>
      <Router>
        <Navbar handleLogout={handleLogout} authenticated={authenticated}/>

        {!authenticated ? (
          <div className="h-[90vh] flex justify-center items-center">
            <LoginForm />
          </div>
        ) : (
          <div className="flex bg-slate-50 h-[calc(92.2vh)]">
            <Sidebar handleLogout={handleLogout} className="h-full hidden sm:grid" />

            <Dashboard className="h-full" />
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
// developed by brocodes
