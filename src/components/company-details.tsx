import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import companyService, { Company } from "../company-service";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  Alert,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";
import { LanguageContext, UserContext } from "../context";
import userService from "../user-service";
import { useNavigate } from "react-router-dom";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

export default function CompanyDetails() {
  // @ts-ignore
  const { company_id } = useParams();
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  //@ts-ignore
  const { user } = useContext(UserContext);
  const {
    calculated_stock_value,
    live_stock_value,
    difference,
    key_figures,
    buy_stock,
    calculated_return,
    buy,
    estimated5year,
  } = language;

  const [company, setCompany] = useState<Company>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sum, setSum] = useState<number>();
  const [roi, setRoi] = useState<number>(0);
  const [companyIndex, setCompanyIndex] = useState<number>(-1);
  const navigate = useNavigate();

  useEffect(() => {
    companyService
      //@ts-ignore
      .get(company_id)
      .then((company) => {
        setCompany(company);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
      });
  }, [company_id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let event_sum = Number(event.currentTarget.value);
    setSum(event_sum);
    let calculated_roi = (
      (event_sum / Number(company?.currentSharePrice)) *
        Number(company?.calculated_value_per_share) -
      event_sum
    ).toFixed(2);
    setRoi(Number(calculated_roi));
  };

  const handleBuy = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const date: number = today.getDate();

    const formattedDate: string = `${year}-${month
      .toString()
      .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

    if (user) {
      userService
        .createUserInvestment(
          //@ts-ignore
          sum / company.currentSharePrice,
          //@ts-ignore
          company.currentSharePrice,
          formattedDate,
          user.user_id,
          //@ts-ignore
          company?.company_id
        )
        .then(() => {
          navigate("/portfolio/" + user.user_id);
        });
    } else {
      navigate("/log_in_needed");
    }
  };

  function calculateDifference(
    cal_val: number | undefined,
    cur_stc: number | undefined
  ) {
    ("");
    if (cal_val && cur_stc) {
      return (((cal_val - cur_stc) / cur_stc) * 100).toFixed(2);
    } else {
      return NaN;
    }
  }

  // Kode relatert til bruk av Chart.js
  const ABGSundal = [5.54, 6.12, 8.19, 13.55, 17.16];
  const AEGA = [1.0, 1.23, 0.93, 0.55, 0.0];

  const companydata = [
    [5.54, 6.12, 8.19, 13.55, 17.16],
    [1.0, 1.02, 1.09, 1.1, 1.13],
    [30.55, 29.33, 24.3, 26.64, 25.07],
    [3.93, 3.74, 3.85, 3.89, 3.95],
    [723, 750.12, 790.8, 850.12, 897.83],
    [66.1, 78.33, 70.36, 70.64, 61.48],
    [407.6, 350.12, 312.1, 290, 249.87],
    [183.08, 190.23, 134.44, 120.12, 99.93],
  ];

  const chartRef = useRef(null);
  const chartInstance = useRef<Chart | undefined>();

  const InitChart = (company_id: number | undefined) => {
    //@ts-ignore
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: ABGSundal.length }, (_, i) => i + 1),
        datasets: [
          {
            label: "ABGSundal",
            data:
              company_id && companydata[companyIndex]
                ? companydata[companyIndex]
                : [],
            borderColor: "rgba(6,41,61, 1)",
            backgroundColor: "rgba(75, 192, 192, 0)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Estimert verdi de neste 5 år",
            // Her kan man legge inn {estimated5year} for å kunne oversette, falt bak i backlogen min, men det ligger i language filen
          },
        },
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Index",
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "NOK",
            },
          },
        },
      },
    });
  };
  useEffect(() => {
    companyService.getAll().then((companies) => {
      const index = companies.findIndex(
        (company) => company.company_id === Number(company_id)
      );
      setCompanyIndex(index);
    });
  }, [company_id]);

  useEffect(() => {
    //@ts-ignore
    InitChart(company_id);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [company_id, companyIndex]);

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
          <Collapse in={openAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, p: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ pt: 1 }}>
                <Typography gutterBottom variant="h3" sx={{ m: 2 }}>
                  {company?.company_name}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Grid container>
                      <Grid item xs={6} md={12}>
                        <Card sx={{ m: 1 }}>
                          <CardContent>
                            <Typography
                              variant="body1"
                              gutterBottom
                              textAlign="center"
                            >
                              {calculated_stock_value}
                            </Typography>
                            <Typography variant="h3" textAlign="center">
                              {Number(
                                company?.calculated_value_per_share
                              ).toFixed(2)}
                              ,-
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Card sx={{ m: 1 }}>
                          <CardContent>
                            <Typography
                              variant="body1"
                              gutterBottom
                              textAlign="center"
                            >
                              {live_stock_value}
                            </Typography>
                            <Typography variant="h3" textAlign="center">
                              {Number(company?.currentSharePrice).toFixed(2)},-
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Card sx={{ m: 1, maxHeight: 267.22 }}>
                      <CardContent>
                        <canvas
                          ref={chartRef}
                          style={{ width: "100%", height: "267.22px" }}
                        ></canvas>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>{key_figures}</Divider>
                  <Box sx={{ m: 2 }}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6">
                          {difference}:{" "}
                          {calculateDifference(
                            company?.calculated_value_per_share,
                            company?.currentSharePrice
                          )}
                          %
                        </Typography>
                      </Grid>
                      {/* <Grid>
                        <Typography variant="h6">Flere nøkkeltall bortover her kanskje?</Typography>
                      </Grid> */}
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>{buy_stock}</Divider>
                  <Box sx={{ ml: 2, mr: 2 }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={3}>
                        <TextField
                          color="secondary"
                          margin="normal"
                          type="number"
                          name="Sum"
                          value={sum}
                          label="Sum"
                          fullWidth
                          inputProps={{ min: 1 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">kr</InputAdornment>
                            ),
                          }}
                          onChange={handleChange}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="h6" sx={{ m: 1 }}>
                          {calculated_return}: {roi} kr
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          disabled={sum ? false : true}
                          size="large"
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={handleBuy}
                        >
                          {buy}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
