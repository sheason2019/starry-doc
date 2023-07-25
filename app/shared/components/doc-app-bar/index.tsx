"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Link from "next/link";
import { useUser } from "../../hooks/use-user";

const routes: { href: string; icon: JSX.Element; label: string }[] = [
  {
    href: "/",
    icon: <HomeIcon />,
    label: "首页",
  },
  {
    href: "/workspaces",
    icon: <WorkspacesIcon />,
    label: "工作区",
  },
];

export default function DocAppBar() {
  const { user, error } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Starry Doc
          </Typography>
          {!!!user && (
            <Button component={Link} href="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 320 }}>
            {routes.map((route) => (
              <ListItem disablePadding key={route.href}>
                <ListItemButton
                  component={Link}
                  onClick={() => setDrawerOpen(false)}
                  href={route.href}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </>
  );
}
