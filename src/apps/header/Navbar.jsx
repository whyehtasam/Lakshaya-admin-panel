import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DrawerDemo  from "../sidebar/Drawer";
import { BrowserRouter as Router } from 'react-router-dom';
const Navbar = ({handleLogout}) => {
  return (
    // <Router>
    <nav className="px-5 h-14 bg-slate-100 flex justify-between items-center">
      <div
       
        className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
        aria-label="logo"
      >
        <DrawerDemo handleLogout={handleLogout}/>
        <svg
          width="95"
          height="94"
          viewBox="0 0 95 94"
          className="w-6 h-auto text-gray-800 hidden sm:block"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>
      
        The Lakshaya
      </div>
      <div>
        {/* <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
      </div>
    </nav>
    // </Router>
  );
};

export default Navbar;
