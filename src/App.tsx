import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import MainLayout from "./components/common/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "todo", element: <Todo /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
