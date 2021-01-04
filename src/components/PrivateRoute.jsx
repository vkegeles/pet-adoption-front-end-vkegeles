import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ADMIN_STATUS = 2;

export default function PrivateRoute({
  needAdminRights = false,
  component: Component,
  altcomponent: AltComponent,
  ...rest
}) {
  const { user } = useAuth();
  const getContent = (props) => {
    let content;
    if (user && (!needAdminRights || user.status === ADMIN_STATUS)) {
      content = <Component {...props} />;
    } else if (AltComponent) {
      content = <AltComponent {...props} />;
    } else {
      content = <Redirect to="/" />;
    }
    return content;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return getContent(props);
      }}
    ></Route>
  );
}
