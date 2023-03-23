import React, { useState, useEffect, useContext } from "react";
// import { NavLink } from 'react-router-dom';
import companyService, { Company } from "../company-service";
import userService, { Investment } from "../user-service";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  IconButton,
  Collapse,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";
import { LanguageContext, UserContext } from "../context";
import { NavLink, useParams } from "react-router-dom";
import { LanguageTextInfo } from "../language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


export function Portfolio() {
  //Language-select related
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    company_name,
    total_price,
    return_percentage,
    return_kr,
    current_value,
    history,
    investment_date,
    amount,
    historic_share_price,
    price_kr,
    sell_button,
    sell_confirmation_header,
    sell_confirmation_body_first_part,
    sell_confirmation_body_second_part,
    sell_confirmation_body_third_part,
    sell_confirmation_body_fourth_part,
    sell_confirmation_cancel,
    sell_confirmation_confirm,
  } = language;

  //@ts-ignore
  const { user } = useContext(UserContext);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  //@ts-ignore
  const { user_id } = useParams();

  useEffect(() => {
    //@ts-ignore
    const current_id = parseInt(user_id, 10); //base 10

    userService
      .getAllUserInvestments(current_id)
      .then((investments) => {
        setInvestments(investments);
        setRefresh(false);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
      });
  }, [refresh]);

  function Row(props: { row: Investment }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const totalPrices: number[] = [];
    const currentSharePrice = [
      {
        company_name: "Europris",
        currentSharePrice: 10.98,
      },
      {
        company_name: "Airthings",
        currentSharePrice: 34,
      },
    ];

    // Calculate total prices for the current company
    investments.forEach((investment) => {
      if (investment.company_name === row.company_name) {
        totalPrices.push(
          Math.round(investment.amount * investment.buy_price * 100) / 100
        );
      }
    });
    const sum = totalPrices.reduce(
      (accumulator, currentElement) => accumulator + currentElement,
      0
    );

    const currentCompanyPrice = currentSharePrice.find(
      (price) => price.company_name === row.company_name
    );
    const currentPrice = currentCompanyPrice?.currentSharePrice || 0;
    const totalShares = investments
      .filter((investment) => investment.company_name === row.company_name)
      // accumulator is the variable that accumulates the result of the callback function,
      //and currentElement is the current element of the array being processed.
      .reduce(
        (accumulator, currentElement) =>
          accumulator + Number(currentElement.amount),
        0
      );
    const currentValue = totalShares * currentPrice;
    const buyValue = sum;
    const returnPercentage = ((currentValue - buyValue) / buyValue) * 100;
    const returnAmount = (returnPercentage / 100) * sum;

    const [openSellConfirm, setOpenSellConfirm] = React.useState(false);

    const handleOpenSellConfirm = () => {
      setOpenSellConfirm(true);
    };

    const handleCloseSellConfirm = () => {
      setOpenSellConfirm(false);
    };

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <NavLink to={"/company/" + row.company_id}>
              {row.company_name}
            </NavLink>
          </TableCell>
          <TableCell align="right">{sum} kr</TableCell>
          <TableCell align="right">
            {Number(returnPercentage.toFixed(2))} %
          </TableCell>
          <TableCell align="right">
            {Number(returnAmount).toFixed(2)} kr
          </TableCell>
          <TableCell align="right">
            {Number(currentValue).toFixed(2)} kr
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.2)",
            }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {history}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>{investment_date}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell align="right">
                        {historic_share_price}
                      </TableCell>
                      {/* Not necesary for now
                      <TableCell align="right">Yield (kr)</TableCell> */}
                      <TableCell align="right">{price_kr}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {investments
                      .filter(
                        (investment) =>
                          investment.company_name === row.company_name
                      )
                      .map((investment) => (
                        //@ts-ignore
                        <TableRow key={investment.buy_date}>
                          <TableCell component="th" scope="row">
                            {new Date(investment.buy_date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            {Number(investment.amount).toFixed(1)}
                          </TableCell>
                          <TableCell align="right">
                            {Number(investment.buy_price).toFixed(2)}
                          </TableCell>

                          {/* <TableCell align="right">Yield: To be implemented if necesary</TableCell> */}
                          <TableCell align="right">
                            {Math.round(
                              investment.amount * investment.buy_price * 100
                            ) / 100}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={() =>
                                //@ts-ignore
                                handleOpenSellConfirm(investment.investment_id)
                              }
                              color="warning"
                            >
                              {sell_button}
                            </Button>
                            <Dialog
                              open={openSellConfirm}
                              onClose={handleCloseSellConfirm}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {sell_confirmation_header}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {sell_confirmation_body_first_part}{" "}
                                  {Number(row.amount).toFixed(1)}{" "}
                                  {sell_confirmation_body_second_part}{" "}
                                  {row.company_name}{" "}
                                  {sell_confirmation_body_third_part}{" "}
                                  {Number(
                                    investment.amount *
                                      investment.buy_price *
                                      ((currentValue -
                                        investment.amount *
                                          investment.buy_price) /
                                        (investment.amount *
                                          investment.buy_price))
                                  ).toFixed(2)}{" "}
                                  {sell_confirmation_body_fourth_part}
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() => handleCloseSellConfirm()}
                                >
                                  {sell_confirmation_cancel}
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleCloseSellConfirm();

                                    const today: Date = new Date();
                                    const year: number = today.getFullYear();
                                    const month: number = today.getMonth() + 1;
                                    const date: number = today.getDate();

                                    const formattedDate: string = `${year}-${month
                                      .toString()
                                      .padStart(2, "0")}-${date
                                      .toString()
                                      .padStart(2, "0")}`;

                                    userService.updateSoldUserInvestment(
                                      formattedDate,
                                      row.user_id,
                                      row.investment_id
                                    );

                                    setRefresh(true);
                                  }}
                                  autoFocus
                                >
                                  {sell_confirmation_confirm}
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />

        <Card
          style={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "3%",
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>{company_name}</TableCell>
                  <TableCell align="right">{total_price}</TableCell>
                  <TableCell align="right">{return_percentage}</TableCell>
                  <TableCell align="right">{return_kr}</TableCell>
                  <TableCell align="right">{current_value}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investments
                  .filter((investment, index, array) => {
                    // Check if the company_name of the current investment is unique
                    return (
                      array.findIndex(
                        (i) => i.company_name === investment.company_name
                      ) === index
                    );
                  })
                  .map((investment) => (
                    <Row key={investment.company_name} row={investment} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </ThemeProvider>
    </>
  );
}
