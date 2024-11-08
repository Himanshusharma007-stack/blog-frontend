import DrawerComponent from "./components/Drawer";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Base() {
  return (
    <div>
      <DrawerComponent />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}
