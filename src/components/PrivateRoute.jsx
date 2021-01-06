import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import { ADMIN_STATUS } from "./../apis/constansts";

export default function PrivateRoute({
  needAdminRights = false,
  component: Component,
  altcomponent: AltComponent,
  ...rest
}) {
  const { user, isLoading } = useAuth();
  const getContent = (props) => {
    let content;
    if (isLoading) {
      content = <Loading />;
    } else if (user && (!needAdminRights || user.status === ADMIN_STATUS)) {
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
