import { Outlet } from "react-router";
import Header from "./Header";

function MainLayout() {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default MainLayout;
