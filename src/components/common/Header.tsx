import { NavLink } from "react-router";
import AuthButton from "../auth/AuthButton";

function Header() {
  return (
    <header className="border-b border-solid border-gray-100 bg-white px-11 py-2 flex justify-between items-center">
      <nav className="flex gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active text-gray-500" : "text-gray-200"
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/todo"
          className={({ isActive }) =>
            isActive ? "active text-gray-500" : "text-gray-200"
          }
        >
          <span>Todo</span>
        </NavLink>
      </nav>
      <AuthButton hasLogin={false} />
    </header>
  );
}

export default Header;
