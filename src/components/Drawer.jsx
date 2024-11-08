import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NavDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => () => {
    navigate(path);
    setOpen(false); // Close the drawer after navigation
  };

  const handleLogout = () => {
    // Clear local storage and navigate to login page
    localStorage.clear();
    navigate("/login-signup");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Login to add/update Blog"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={handleNavigation(
                index % 2 === 0 ? "/" : "/login-signup"
              )}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <LoginIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={toggleDrawer(true)} aria-label="open drawer">
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: "bold",
          ml: 1,
          fontFamily: "'Roboto', sans-serif",
          cursor: "pointer",  
        }}
        onClick={() => navigate('/')}
      >
        Blogify
      </Typography>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {location.pathname === "/userBlogs" && (
        <Button
          sx={{ position: "absolute", top: 10, right: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </div>
  );
}
