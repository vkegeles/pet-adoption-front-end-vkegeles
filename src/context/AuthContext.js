import React, { createContext, useState, useContext } from "react";
import * as auth from "../helpers/auth";
// import Loading from "../components/Loading";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  // const [fetched, setFetched] = useState(false);

  const signUp = (username, password) => {
    return auth.signup(username, password).then((data) => {
      setUser(data.data);
    });
  };

  const login = (email, password) => {
    return auth.login(email, password).then((data) => {
      console.log(data);
      console.log(data.user);

      setUser(data.user);
    });
  };

  const logout = async () => {
    setUser(null);
    await auth.logout();
  };

  // const getUser = async () => {
  //   const user = await auth.getUser();
  //   setUser(user ? user.data : null);
  // };

  // if (!fetched) {
  //   getUser().then(() => setFetched(true));
  // }

  // if (!fetched) {
  //   return <Loading />;
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
        // getUser,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider };
