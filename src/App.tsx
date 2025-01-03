import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import MainLayout from "./components/common/MainLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "todo", element: <Todo /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
