import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import Authenticated from "./components/Authenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <SearchPage />
      </Authenticated>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: (
      <Authenticated>
        <ProfilePage />
      </Authenticated>
    ),
  },
]);

function App() {
  return (
    <AuthenticationProvider>
      <RouterProvider router={router} />
    </AuthenticationProvider>
  );
}

export default App;
