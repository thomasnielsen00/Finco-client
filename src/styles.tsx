import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let MidlertidigTheme = createTheme({
  palette: {
    //@ts-ignore
    mode: "light",
    primary: {
      main: "#06293d",
    },
    secondary: {
      main: "#06293d",
    },
    background: {
      default: "#fffcf4",
    },
  },
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
});

MidlertidigTheme = responsiveFontSizes(MidlertidigTheme);
