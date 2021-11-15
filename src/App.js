import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import AdminRoutes from "./routes/AdminRoutes";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedSwitch } from "react-router-transition";
import { useSpinner } from "./hooks/useSetupSpinner";
import PublicRoutes from "./routes/PublicRoutes";
import { Box, CircularProgress } from "@material-ui/core";
function App() {
  const spinner = useSpinner();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const role =
    Boolean(JSON.parse(localStorage.getItem("dataUser"))) &&
    JSON.parse(localStorage.getItem("dataUser")).role === "admi";
  return (
    <div className="App">
      {/* fallback to be changed to loading component */}
      <Suspense
        fallback={
          <Box
            height="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="primary" />
          </Box>
        }
      >
        <Router>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          >
            <Route path="/backoffice" component={AdminRoutes} />
            <Route path="/" component={PublicRoutes} />
          </AnimatedSwitch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
