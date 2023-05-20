import React, { useState } from "react";
import { LanguageContext, UserContext } from "./context";
import { Route, Routes, HashRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import LogIn from "./components/login-form";
import Register from "./components/register-user";
import Market from "./components/market";
import CompanyDetails from "./components/company-details";
import Home from "./components/homepage";
import { Portfolio } from "./components/portfolio";
import { languageText, LanguageTextInfo } from "./language";
import { User } from "./user-service";
import CompanyCalculations from "./components/company-calculations";
import AdminPage from "./components/adminpage";
import { LogInNeeded } from "./components/log-in-needed";
import { UserDetails } from "./components/user-details";
import Disclaimer from "./components/disclaimer";

export default function App() {
  const [user, setUser] = useState<User | boolean>(false);
  const [language, setLanguage] = useState<LanguageTextInfo>(
    //@ts-ignore
    languageText.norwegian
  );

  // Different paths and the components they render
  return (
    <HashRouter>
      {/* @ts-ignore */}
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {/* @ts-ignore */}
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Disclaimer />
          <Routes>
            {/* @ts-ignore */}
            <Route exact path="/" element={<Home />} />
            <Route path="/users/:user_id" element={<UserDetails />} />
            <Route path="/portfolio/:user_id" element={<Portfolio />} />
            {/* This component is rendered when a user tries to open a portfolio but is not logged in */}
            <Route path="/log_in_needed" element={<LogInNeeded />} />
            <Route path="/log_in" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/market" element={<Market />} />
            <Route
              //@ts-ignore
              exact
              path="/company/:company_id"
              element={<CompanyDetails />}
            />
            <Route
              //@ts-ignore
              exact
              path="/companycalculations/:company_id"
              element={<CompanyCalculations />}
            />
          </Routes>
        </UserContext.Provider>
      </LanguageContext.Provider>
    </HashRouter>
  );
}
