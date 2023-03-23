import { createTheme, Theme } from "@mui/material/styles";

export const MidlertidigTheme = createTheme({
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

//@ts-ignore
// export const useStyles = makeStyles((MidlertidigTheme) => ({
//   container: {
//     // backgroundColor: '#faa7a7',
//     backgroundImage: "linear-gradient(to bottom right, lightblue, lightgreen)",
//   }
// }));
