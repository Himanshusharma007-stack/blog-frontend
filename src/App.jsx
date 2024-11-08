import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ActionAreaCard from "./components/Card";
import Base from "./BaseLayout";
import LoginSignup from "./components/LoginSignup";
import DetailCard from "./components/DetailCard";
import DataTable from './components/UserTable'

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "",
        element: <ActionAreaCard />,
      },
      {
        path: "/blog/:id",
        element: <DetailCard />,
      },
      {
        path: "login-signup",
        element: <LoginSignup />,
      },
      {
        path: "userBlogs",
        element: <DataTable />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
