import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  CssBaseline,
  Container,
  TextField,
  Box,
  Typography,
  Avatar,
  Grid,
  Link,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";
import { LanguageContext, UserContext } from "../context";
import userService from "../user-service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // context, må lage en type for brukere
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    sign_up,
    create_user,
    full_name,
    mail,
    password,
    confirm_password,
    cancel,
    write_full_name,
    email_not_valid,
    password_not_long_enough,
    passwords_not_matching,
    email_in_use,
  } = language;

  const defaultSignUpFormValues = {
    full_name: "",
    mail: "",
    password: "",
    confirm_password: "",
  };

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [signUpFormValues, setSignUpFormValues] = useState(
    defaultSignUpFormValues
  );
  const [error, setError] = useState({
    full_name: false,
    mail: false,
    password: false,
    confirm_password: false,
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormValues({
      ...signUpFormValues,
      [event.target.name]: event.target.value,
    });
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    formValidation(signUpFormValues, setError)
      .then(() =>
        userService
          .createUser(
            signUpFormValues.full_name,
            signUpFormValues.mail,
            signUpFormValues.password
          )
          .then((user_id) => {
            userService
              .getUser(user_id)
              .then((user) => {
                setUser(user);
              })
              .then(() => navigate(`/users/${user_id}`))
              .catch((error) => {
                console.error(error.message);
              });
          })
          .catch((error) => {
            if (error.response.status == 409) {
              setErrorMessage(email_in_use);
              setOpenAlert(true);
            } else {
              console.error(error.message);
            }
          })
      )
      .catch(() => console.log("Error in form detected"));
  };

  // midlertidig type
  const formValidation = (signUpFormValues: any, setError: any) => {
    return new Promise<void>((resolve, reject) => {
      //pattern for testing if there is a letter both before and after the space (\s), both with upper and lowerCase
      let pattern = /[a-zA-Z]\s[a-zA-Z]/;
      //Validation for full name input
      if (!pattern.test(signUpFormValues.full_name)) {
        //usikker på om dette er riktig typescript
        setError((prevState: object) => ({ ...prevState, full_name: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, full_name: false }));
      }
      //Validation for email input
      if (!signUpFormValues.mail.includes("@")) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, mail: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, mail: false }));
      }
      //Validation for password input
      if (signUpFormValues.password.length < 8) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, password: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, password: false }));
      }
      //Validation for confirm_password input
      if (signUpFormValues.password != signUpFormValues.confirm_password) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, confirm_password: true }));
        reject();
      } else {
        //@ts-ignore

        setError((prevState) => ({ ...prevState, confirm_password: false }));
      }
      resolve();
    });
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ mt: { xs: 5, sm: 14 } }}>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: MidlertidigTheme.palette.secondary.main }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {sign_up}
          </Typography>
          <TextField
            required
            error={error.full_name}
            fullWidth
            color="secondary"
            helperText={error.full_name ? write_full_name : ""}
            margin="normal"
            name="full_name"
            value={signUpFormValues.full_name}
            label={full_name}
            onChange={handleChange}
          />
          <TextField
            required
            error={error.mail}
            fullWidth
            color="secondary"
            helperText={error.mail ? email_not_valid : ""}
            margin="normal"
            name="mail"
            value={signUpFormValues.mail}
            label={mail}
            onChange={handleChange}
          />
          <TextField
            required
            error={error.password}
            fullWidth
            color="secondary"
            helperText={error.password ? password_not_long_enough : ""}
            margin="normal"
            name="password"
            value={signUpFormValues.password}
            label={password}
            type="password"
            onChange={handleChange}
          />
          <TextField
            required
            error={error.confirm_password}
            fullWidth
            color="secondary"
            helperText={error.confirm_password ? passwords_not_matching : ""}
            margin="normal"
            name="confirm_password"
            value={signUpFormValues.confirm_password}
            label={confirm_password}
            type="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {create_user}
          </Button>
          <Grid container>
            <Grid item sx={{ pt: 2 }}>
              <Link href="#" variant="body2">
                {cancel}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
