import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountCircle,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const Navigation = ({ user }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logged Out");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Online Test Platform
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user.role === "teacher" && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/teacher/dashboard"
                startIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
            </>
          )}
          {user.role === "student" && (
            <Button
              color="inherit"
              component={Link}
              to="/student/dashboard"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
          )}
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Typography>{user.name}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography color="textSecondary" variant="body2">
                {user.email}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
