"use client";

import { useState } from "react";
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
import Link from "next/link";

export default function DocAppBar() {
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
          <Button component={Link} href="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 320 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                onClick={() => setDrawerOpen(false)}
                href="/"
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="个人首页" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </>
  );
}
