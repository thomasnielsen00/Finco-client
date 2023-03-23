import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
// import companyService, { Company } from './company-service';
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  Container,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Icon,
  Hidden,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MidlertidigTheme } from "../styles";
import { languageText, LanguageTextInfo } from "../language";
import { LanguageContext, UserContext } from "../context";
import { Menu as MenuIcon } from "@mui/icons-material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import userService, { User } from "../user-service";

const NavBar = () => {
  //@ts-ignore
  const { language, setLanguage } = useContext(LanguageContext);
  const {
    change_language,
    property,
    marked,
    portfolio,
    log_in,
    about,
    profile,
    admin,
  } = language;
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  function updateLanguage() {
    if (property == "norwegian") {
      setLanguage(languageText.english);
    } else {
      setLanguage(languageText.norwegian);
    }
  }

  const menuItems = (
    <List>
      <ListItemButton key={marked} href={"/market"}>
        <ListItemText primary={marked} />
      </ListItemButton>
      <ListItemButton key={portfolio} href={"/portifolio"}>
        <ListItemText primary={portfolio} />
      </ListItemButton>
      <ListItemButton key={about} href={"https://www.finco.no/"}>
        <ListItemText primary={about} />
      </ListItemButton>
      <ListItemButton
        key={log_in}
        href={user ? "/users/" + user.user_id : "/log_in"}
      >
        <ListItemText primary={user ? profile : log_in} />
      </ListItemButton>
      {user.admin && (
        <ListItemButton key={admin} href="/adminpage">
          <ListItemText primary={admin} />
        </ListItemButton>
      )}

      <ListItemButton key={change_language} onClick={() => updateLanguage()}>
        <ListItemText primary={change_language} />
      </ListItemButton>
    </List>
  );

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <AppBar position="static" color="secondary">
          <Container maxWidth="xl">
            <Toolbar sx={{ p: 0 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <NavLink to={"/"}>
                <Box
                  component="img"
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    maxWidth: "160px",
                    height: "45px",
                    mr: 4,
                    ml: 4,
                  }}
                  alt="Finco logo"
                  src="images/logo.png"
                />
              </NavLink>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  size="large"
                  key={marked}
                  color="inherit"
                  component="a"
                  href={"/#/market"}
                  sx={{ display: "block", ml: 2, mr: 1 }}
                >
                  {marked}
                </Button>
                <Button
                  size="large"
                  key={portfolio}
                  color="inherit"
                  component="a"
                  href={
                    user ? "/#/portfolio/" + user.user_id : "/#/log_in_needed"
                  }
                  sx={{ display: "block", ml: 1, mr: 1 }}
                >
                  {portfolio}
                </Button>
                <Button
                  size="large"
                  key={about}
                  color="inherit"
                  component="a"
                  href={"https://www.finco.no/"}
                  sx={{ display: "block", ml: 1, mr: 2 }}
                >
                  {about}
                </Button>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  size="large"
                  color="inherit"
                  key={log_in}
                  endIcon={user ? <AccountCircleIcon /> : <LoginIcon />}
                  component="a"
                  href={user ? "/#/users/" + user.user_id : "/#/log_in"}
                  sx={{ ml: 2, mr: 1 }}
                >
                  {user ? profile : log_in}
                </Button>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {user.admin && (
                  <Button
                    color="inherit"
                    key={admin}
                    component="a"
                    href="#/adminpage"
                    sx={{ ml: 2, mr: 2 }}
                  >
                    {admin}
                  </Button>
                )}
                <Button
                  size="large"
                  color="inherit"
                  endIcon={<LanguageIcon />}
                  sx={{ ml: 1 }}
                  onClick={() => updateLanguage()}
                >
                  {change_language}
                </Button>
              </Box>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ display: { md: "none" } }}
              >
                <NavLink to={"/"}>
                  <Box
                    component="img"
                    sx={{
                      display: { md: "none", xs: "flex" },
                      flexGrow: 1,
                      justifyContent: "flex-end",
                      maxWidth: "160px",
                      height: "45px",
                      ml: 4,
                      mr: 4,
                    }}
                    alt="Finco logo"
                    src="images/logo.png"
                  />
                </NavLink>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer anchor="top" open={open} onClose={handleDrawerToggle}>
          <div
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            {menuItems}
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default NavBar;
