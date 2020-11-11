import React from "react";
import { getToken } from "../../utils/authorization";
import { Redirect, useHistory } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = getToken();
  const history = useHistory();

  if (token) return <div>{children}</div>;
  else {
    history.push("/auth");
    return <div></div>;
  }
}
export default ProtectedRoute;
