import { NavLink } from "react-router";

function Header() {
  return (
    <header className="border-b border-solid border-gray-100 bg-white px-11 py-4">
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
    </header>
  );
}

export default Header;
