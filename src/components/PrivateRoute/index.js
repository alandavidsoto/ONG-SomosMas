import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({
  path,
  condition,
  trueComponent,
  elseRedirect,
}) => {
  const Component = trueComponent;
  return (
    <Route path={path} exact>
      {condition ? Component : <Redirect to={elseRedirect} />}
    </Route>
  );
};
