import { useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { LanguageContext } from "../context";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";

export function LogInNeeded() {
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    log_in_needed_text,
    log_in_here,
    or,
    create_a_user,
    to_access_portfolio,
  } = language;

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Card style={{ width: "40%", textAlign: "center" }}>
            <CardHeader title={log_in_needed_text} sx={{ mt: 2 }} />
            <CardContent>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: "200px",
                  fontSize: "16px",
                  mb: 2,
                }}
                href={"/log_in"}
              >
                {log_in_here}
              </Button>
              <Typography>{or}</Typography>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: "200px",
                  fontSize: "16px",
                  m: 2,
                }}
                href={"/register"}
              >
                {create_a_user}
              </Button>
              <Typography>{to_access_portfolio}</Typography>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </>
  );
}
