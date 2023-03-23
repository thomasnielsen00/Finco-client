import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import companyService, { companycalculations } from "../company-service";
import {
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  Alert,
  IconButton,
  Collapse,
  Stack,
  Box,
  Divider,
  CardMedia,
  Paper,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@emotion/react";
import { MidlertidigTheme } from "../styles";
import { LanguageContext, UserContext } from "../context";

export default function CompanyCalculations() {
  //denne må ses over
  // @ts-ignore
  const { company_id } = useParams();
  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { calculated_stock_value, live_stock_value, difference, ebitda } =
    language;
  const [company, setCompany] = useState<companycalculations>();

  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (user.admin) {
      companyService
        .getCompanyCalculations(Number(company_id))
        .then((company) => {
          setCompany(company);
        })
        .catch((error) => {
          setOpenAlert(true);
          setErrorMessage(error.message);
        });
    } else {
      navigate("#");
    }
  }, []);

  function calculateDifference(
    cal_val: number | undefined,
    cur_stc: number | undefined
  ) {
    if (cal_val && cur_stc) {
      return (((cal_val - cur_stc) / cur_stc) * 100).toFixed(2);
    } else {
      return NaN;
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 3 }}>
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
                      {/* 135.01 x 2 + 16, 135 er høyde på de andre kortene til venstre, foreløpig*/}
                      <CardContent>
                        <CardMedia
                          sx={{ aspectRatio: "16/9" }}
                          component="img"
                          src="images/test-chart.png"
                          alt="Chart"
                        ></CardMedia>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>NØKKELTALL</Divider>
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
                    </Grid>
                    {company && (
                      <Stack spacing={2}>
                        <Item>
                          {/* EBITDA */}
                          <Typography variant="h5">{ebitda}</Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            color={"inherit"}
                          >
                            {Number(company.EBITDA).toFixed(2)},-
                          </Typography>
                        </Item>
                        <Item>
                          {/*OCFBT*/}
                          <Typography variant="h5">
                            Operational Cash Flow Before Taxes
                          </Typography>
                          <Typography variant="h6">{company.OCFBT}</Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Cash Flow Before taxes
                          </Typography>
                          <Typography variant="h6">{company.CFBT}</Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Pre-Financing Cash Flow
                          </Typography>
                          <Typography variant="h6">{company.PFCF}</Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Unlevered Free Cash Flow
                          </Typography>
                          <Typography variant="h6">{company.UFCF}</Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Discount</Typography>
                          <Typography variant="h6">
                            {company.discount}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Present Value</Typography>
                          <Typography variant="h6">
                            {company.presentvalue}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Future EBITDA</Typography>
                          <Typography variant="h6">
                            {company.future_EBITDA.map((ebitda, index) => (
                              <Typography key={ebitda}>
                                {" "}
                                Year {index + 1} : {ebitda}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future change in working capital
                          </Typography>
                          <Typography variant="h6">
                            {company.future_changeNWC.map((nwc, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(nwc).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Operational Cash Flow Before Tax
                          </Typography>
                          <Typography variant="h6">
                            {company.futureOCFBT.map((OFCBT, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(OFCBT).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Future CAPEX</Typography>
                          <Typography variant="h6">
                            {company.future_CAPEX.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Taxes Paid
                          </Typography>
                          <Typography variant="h6">
                            {company.future_taxespaid.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Pre Financing Cash Flow
                          </Typography>
                          <Typography variant="h6">
                            {company.future_PFCF.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Depreciation of Lease Adjustment
                          </Typography>
                          <Typography variant="h6">
                            {company.future_depLeaseAdjustment.map(
                              (value, index) => (
                                <Typography key={index}>
                                  Year {index + 1}: {Number(value).toFixed(2)}{" "}
                                </Typography>
                              )
                            )}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Operational Lease Adjustment
                          </Typography>
                          <Typography variant="h6">
                            {company.future_opLeaseAdjustment.map(
                              (value, index) => (
                                <Typography key={index}>
                                  Year {index + 1}: {Number(value).toFixed(2)}{" "}
                                </Typography>
                              )
                            )}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Future Unlevered Free Cash Flow
                          </Typography>
                          <Typography variant="h6">
                            {company.future_UFCF.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Future Discount</Typography>
                          <Typography variant="h6">
                            {company.futureDiscount.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Present Value Unlevered Free Cash Flow
                          </Typography>
                          <Typography variant="h6">
                            {company.presentValueUFCF.map((value, index) => (
                              <Typography key={index}>
                                Year {index + 1}: {Number(value).toFixed(2)}{" "}
                              </Typography>
                            ))}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Terminal Value</Typography>
                          <Typography variant="h6">
                            {company.EBITDAresult}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Discount in 2027</Typography>
                          <Typography variant="h6">
                            {company.futureDiscount2027}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Discounted Terminal Value
                          </Typography>
                          <Typography variant="h6">
                            {company.discountedTerminalValue}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Present Value of Unlevered Free Cash Flow
                          </Typography>
                          <Typography variant="h6">
                            {company.PVofUnleveredFCF}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">Enterprise Value</Typography>
                          <Typography variant="h6">
                            {company.enterpriseValue}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Implied Equity Value
                          </Typography>
                          <Typography variant="h6">
                            {company.impliedEquityValue}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Implied Equity of Common Stockholders
                          </Typography>
                          <Typography variant="h6">
                            {company.ImpliedEquityofCommonStockholders}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Current Share Price
                          </Typography>
                          <Typography variant="h6">
                            {company.currentSharePrice}
                          </Typography>
                        </Item>
                        <Item>
                          <Typography variant="h5">
                            Amount of Shares currently available
                          </Typography>
                          <Typography variant="h6">
                            {company.amountShares}
                          </Typography>
                        </Item>
                      </Stack>
                    )}
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
