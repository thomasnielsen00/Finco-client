import { useContext } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";
import { LanguageContext } from "../context";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

export default function Home() {
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { get_started, header, welcome_text } = language;
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <div
        style={{
          width: "100%",
          height: "85vh",
          background:
            "linear-gradient(0deg, rgba(255,252,244,1) 60%, rgba(6,41,61,1) 100%)",
        }}
      >
        {/* her er det styling */}
        <Container maxWidth="lg">
          <Grid
            container
            sx={{ paddingTop: { xs: 8, sm: 12, md: 15, lg: 18 } }}
          >
            <Grid item md={7} xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h2" color="textPrimary" gutterBottom>
                    {header}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    paragraph
                    gutterBottom
                  >
                    {welcome_text}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      height: "50px",
                      width: "200px",
                      padding: 2,
                      background: "#d4af37",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    href={"#/market"}
                  >
                    {get_started}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={5} item sx={{ display: { xs: "none", md: "flex" } }}>
              <Box
                component="img"
                sx={{
                  height: "16rem",
                  pl: { md: 0.5, lg: 6 },
                }}
                alt="Home page image"
                src="images/home-pic.png"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
