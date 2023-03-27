import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Alert,
  Autocomplete,
  CircularProgress,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import userService, { Industry, User } from "../user-service";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from "@mui/icons-material/Logout";
import { green } from "@mui/material/colors";
import { LanguageContext, UserContext } from "../context";
import { MidlertidigTheme } from "../styles";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

// Skal vi ha med dette?:
// const risk_willingness: Array<{ value: string; label: string }> = [
//   {
//     value: 'high',
//     label: 'High',
//   },
//   {
//     value: 'moderate',
//     label: 'Moderate',
//   },
//   {
//     value: 'low',
//     label: 'Low',
//   },
// ];

export function UserDetails() {
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    general_information,
    email_inputLabel,
    password_inputLabel,
    full_name_inputLabel,
    phone_number_inputLabel,
    investing_details,
    monthly_savings_inputLabel,
    from_kr_underLabel,
    to_kr_underLabel,
    risk_willingness_inputLabel,
    prefered_industries_inputLabel,
    button_saved,
    button_save,
    sign_out,
  } = language;

  //@ts-ignore
  const [userData, setUserData] = useState<User>({});
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  //Save-button related
  const [loading, setLoading] = React.useState(false);
  ////Save-button related
  const [savedChange, setSavedChange] = React.useState(false);
  ////Save-button related
  const timer = React.useRef<number>();
  const { user_id } = useParams();
  const navigate = useNavigate();
  //Constant referering to the defined styling of given elements:
  //Following const is regarding user-prefered Industry:
  const [preferedIndustries, setPreferedIndustries] = useState<Industry[]>([]);
  //Following const is related to the Automcomplete element regarding all industries
  const [allIndustries, setAllIndustries] = useState<Industry[]>([]);
  //Following const is related to the new industries a user selects in the autoComplete-element
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);

  const handleIndustryChange = (event: any, values: Industry[]) => {
    const updatedValues = values.map((value) => {
      if (!value.user_id) {
        // add user_id to the new industry object
        return {
          industry_id: value.industry_id,
          user_id: Number(user_id),
          industry_name: value.industry_name,
        };
      } else {
        return value;
      }
    });
    setPreferedIndustries(updatedValues);
    setSavedChange(false);

    // Check if an industry was removed
    const removedIndustry = preferedIndustries.find(
      (industry) => !values.includes(industry)
    );

    if (removedIndustry) {
      const industryId = removedIndustry.industry_id;
      //@ts-ignore
      userService.deleteUserIndustry(industryId, user_id);
    }
  };

  //Save-button related
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const buttonText = savedChange ? button_saved : button_save;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    //Every time there is a change of input the button is reset to "Save changes"
    setSavedChange(false);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading) {
      setSavedChange(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSavedChange(true);
        setLoading(false);
        event.preventDefault();

        userService.updateUser(userData).catch((error) => console.log(error));
        preferedIndustries.map((preferedIndustry) =>
          userService.createNewPreferedIndustry(
            preferedIndustry.user_id,
            preferedIndustry.industry_name
          )
        );
      }, 2000);
    }
  };

  const handleSignOut = () => {
    if (user) {
      setUser(false);
      navigate("/#");
    }
  };

  //The code below fetches the details for a given user with the provided method in the userService-objekt
  useEffect(() => {
    //@ts-ignore
    const current_id = parseInt(user_id, 10); //base 10
    if (!user) {
      navigate("/log_in_needed");
    }
    userService
      .getAllPreferedIndustries(current_id)
      .then((preferedIndustries) => {
        setPreferedIndustries(preferedIndustries);

        // setSelectedIndustries(preferedIndustries);
      });

    userService
      .getAllIndustries()
      .then((allIndustries) => setAllIndustries(allIndustries));

    userService
      .getUser(current_id)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        // setOpenAlert(true);
        // setErrorMessage(error.message);
        <Alert>{error}</Alert>;
      });
  }, [user_id]);

  // const risk_option = ['Høy', 'Moderat', 'Lav'];

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <form>
          <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h5">{general_information}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                <InputLabel htmlFor="email">{email_inputLabel}</InputLabel>

                <TextField
                  required
                  // helperText="Denne må være fylt ut"
                  id="email"
                  name="email"
                  // label={userData?.email}
                  variant="outlined"
                  disabled
                  value={userData?.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                <InputLabel htmlFor="password">
                  {password_inputLabel}
                </InputLabel>

                <TextField
                  required
                  id="password"
                  name="password"
                  disabled
                  // type="password"
                  // label={userData?.password}
                  variant="outlined"
                  value={userData?.password}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                <InputLabel htmlFor="full_name">
                  {full_name_inputLabel}
                </InputLabel>

                <TextField
                  required
                  id="full_name"
                  name="full_name"
                  // label="Full name"
                  variant="outlined"
                  // type="tel"
                  value={userData?.full_name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                <InputLabel htmlFor="phone_number">
                  {phone_number_inputLabel}
                </InputLabel>

                <TextField
                  required
                  id="phone_number"
                  name="phone_number"
                  // label={userData?.phone_number}
                  variant="outlined"
                  // type="tel"
                  value={userData?.phone_number}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
            </Grid>
            <br></br>
            <Typography variant="h5">{investing_details}</Typography>

            <Grid container spacing={{ xs: 1, sm: 2 }}>
              {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
              <Grid item xs={6}>
                <InputLabel htmlFor="monthly_savings_amount">
                  {monthly_savings_inputLabel}
                </InputLabel>

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="savings_from"
                      name="savings_from"
                      type="number"
                      variant="outlined"
                      value={userData?.savings_from}
                      onChange={handleChange}
                      fullWidth
                      sx={{ bgcolor: "white" }}
                    />
                    <FormHelperText>{from_kr_underLabel}</FormHelperText>
                  </Grid>
                  {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="savings_to"
                      name="savings_to"
                      variant="outlined"
                      type="number"
                      value={userData?.savings_to}
                      onChange={handleChange}
                      fullWidth
                      sx={{ bgcolor: "white" }}
                    />
                    <FormHelperText>{to_kr_underLabel}</FormHelperText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
                <InputLabel htmlFor="risk_willingness">
                  {risk_willingness_inputLabel}
                </InputLabel>

                <TextField
                  required
                  id="risk_willingness"
                  name="risk_willingness"
                  // label= "Risk willing"
                  variant="outlined"
                  value={userData?.risk_willingness}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="prefered_industries">
                  {prefered_industries_inputLabel}
                </InputLabel>
                {/* Må sørge for at alle industrier slettes når kryss-knappen trykkes på */}
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  disableClearable
                  //Here i check if the option is already a part of preferedIndustries
                  //and thus removing it from the options-dropDown menu
                  options={allIndustries.filter(
                    (option) =>
                      //Checks wheter preferedIndustries does not contain a industry_id equal to the option in question
                      !preferedIndustries.some(
                        (preferedIndustry) =>
                          preferedIndustry.industry_id === option.industry_id
                      )
                  )}
                  getOptionLabel={(option) => option.industry_name}
                  value={preferedIndustries}
                  onChange={handleIndustryChange}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      sx={{ bgcolor: "white" }}
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <br></br>

            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Button
                  variant="contained"
                  aria-label="save"
                  color={savedChange ? "success" : "primary"}
                  onClick={handleSubmit}
                >
                  {buttonText}
                  {savedChange ? <CheckIcon /> : <SaveIcon />}
                </Button>
              </Grid>
              <Grid item>
                {/* sx={{ alignItems: "end" }} */}
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSignOut}
                >
                  {sign_out} <LogoutIcon />
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </ThemeProvider>
    </>
  );
}
