import React, { useState, useEffect, useContext } from "react";
// import { NavLink } from 'react-router-dom';
import companyService, { Company } from "../company-service";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  Alert,
  IconButton,
  Collapse,
  Tooltip,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";
import { LanguageContext, UserContext } from "../context";

export default function Market() {
  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    calculated_stock_value,
    live_stock_value,
    explore_company,
    difference,
    calculated,
    search,
    sort_by,
    no_sort,
  } = language;
  const [companies, setCompanies] = useState<Company[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    companyService
      .getAll()
      .then((companies) => {
        setCompanies(companies);
        const updatedCompanies = companies.map((c) => {
          return {
            ...c,
            calculated_difference: Number(
              (
                ((c.calculated_value_per_share - c.currentSharePrice) /
                  c.currentSharePrice) *
                100
              ).toFixed(2)
            ),
          };
        });
        setCompanies(updatedCompanies);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  //@ts-ignore
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortValue === "CSV") {
      return b.calculated_value_per_share - a.calculated_value_per_share;
    }
    if (sortValue === "LIVE") {
      return b.currentSharePrice - a.currentSharePrice;
    }
    if (sortValue === "DIFF") {
      return b.calculated_difference - a.calculated_difference;
    } else {
      return companies;
    }
  });

  const filterCompanies = sortedCompanies.filter((c) => {
    if (searchValue) {
      return c.company_name.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return sortedCompanies;
    }
  });

  function calculateDifference(cal_val: number, cur_stc: number) {
    let diff = Number((((cal_val - cur_stc) / cur_stc) * 100).toFixed(2));
    if (diff > 10) {
      return (
        <Typography variant="h6" color={"green"} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingUpIcon />
        </Typography>
      );
    }
    if (10 > diff && diff > -10) {
      return (
        <Typography variant="h6" color={"orange"} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingFlatIcon />
        </Typography>
      );
    }
    if (diff < -10) {
      return (
        <Typography variant="h6" color={"red"} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingDownIcon />
        </Typography>
      );
    }
  }

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 3, mb: 2 }}>
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
          <Box sx={{ mt: 2, mb: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item lg={3} md={4} xs={6}>
                <TextField
                  color="secondary"
                  value={searchValue}
                  label={search}
                  onChange={handleSearch}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid lg={3} md={4} xs={6} item>
                <FormControl fullWidth>
                  <InputLabel>{sort_by}</InputLabel>
                  <Select
                    label={sort_by}
                    value={sortValue}
                    IconComponent={SortIcon}
                    onChange={handleSort}
                  >
                    <MenuItem value="">
                      <em>{no_sort}</em>
                    </MenuItem>
                    <MenuItem value={"CSV"}>{calculated_stock_value}</MenuItem>
                    <MenuItem value={"LIVE"}>{live_stock_value}</MenuItem>
                    <MenuItem value={"DIFF"}>{difference}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {filterCompanies.map((company) => (
            <Card key={company.company_id} sx={{ mt: 2, p: 1 }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item md={3} xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", m: { xs: 1, sm: 0 } }}
                  >
                    {company.company_name}
                  </Typography>
                  <Divider
                    sx={{ visibility: { xs: "visible", sm: "hidden" } }}
                  />
                </Grid>

                <Grid item md={2.8} xs={6.5}>
                  <Tooltip title={calculated_stock_value}>
                    <Typography
                      variant="h6"
                      sx={{ m: { xs: 1, sm: 0 }, mb: 0 }}
                    >
                      {calculated}:{" "}
                      {Number(company.calculated_value_per_share).toFixed(2)} kr
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item md={2.2} xs={5.5}>
                  <Tooltip title={live_stock_value}>
                    <Typography
                      variant="h6"
                      sx={{
                        m: { xs: 1, sm: 0 },
                        mb: 0,
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      Live: {Number(company.currentSharePrice).toFixed(2)} kr
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item md={2} xs={12}>
                  <Tooltip title={difference}>
                    <Box
                      sx={{ textAlign: { xs: "center", sm: "left" }, pt: 0 }}
                    >
                      {calculateDifference(
                        company.calculated_value_per_share,
                        company.currentSharePrice
                      )}
                    </Box>
                  </Tooltip>
                </Grid>

                <Grid item md={2} xs={12}>
                  <Button
                    color="success"
                    variant="contained"
                    fullWidth
                    endIcon={<ReadMoreIcon />}
                    component="a"
                    href={"/#/company/" + company.company_id}
                  >
                    {explore_company}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Container>
      </ThemeProvider>
    </>
  );
}
