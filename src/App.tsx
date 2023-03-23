import React, { useState } from "react";
import { LanguageContext, UserContext } from "./context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
import NavBar from "./components/navbar";
import LogIn from "./components/login-form";
import Register from "./components/register-user";
import Market from "./components/market";
import CompanyDetails from "./components/company-details";
import Home from "./components/homepage";
import { Portfolio } from "./components/portfolio";
import { languageText, LanguageTextInfo } from "./language";
// import { UserProfile, LogInNeeded } from "./components/userDetails";
import { User } from "./user-service";
// import adminpage from "./components/adminpage";
// import CompanyCalculations from "./components/company-calculations";

export default function App() {
  const [user, setUser] = useState<User | boolean>(false);
  const [language, setLanguage] = useState<LanguageTextInfo>(
    //@ts-ignore
    languageText.norwegian
  );

  return (
    <HashRouter>
      {/* @ts-ignore */}
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {/* @ts-ignore */}
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Routes>
            {/* @ts-ignore */}
            <Route exact path="/" element={<Home />} />
            {/* Må kanskje være :user_id, men funker ikke ends mtp teststien i finco-components */}
            {/* <Route exact path="/users/:user_id" element={<UserProfile />} /> */}
            {/* @ts-ignore */}
            <Route exact path="/portfolio/:user_id" element={<Portfolio />} />
            {/* This component is rendered when a user tries to open a portfolio but is not logged in */}
            {/* <Route exact path="/log_in_needed" component={LogInNeeded} /> */}
            {/* @ts-ignore */}
            <Route exact path="/log_in" element={<LogIn />} />
            {/* @ts-ignore */}
            <Route exact path="/register" element={<Register />} />
            {/* @ts-ignore */}
            {/* <Route exact path="/adminpage" component={adminpage} /> */}
            {/* @ts-ignore */}
            <Route path="/market" element={<Market />} />
            <Route
              //@ts-ignore
              exact
              path="/company/:company_id"
              element={<CompanyDetails />}
            />
            {/* <Route
              exact
              path="/companycalculations/:company_id"
              component={CompanyCalculations}
            /> */}
          </Routes>
        </UserContext.Provider>
      </LanguageContext.Provider>
    </HashRouter>
  );
}
