import React, { createContext, useState, useContext, useEffect } from "react";
import * as auth from "../apis/auth";
// import Loading from "../components/Loading";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);
  // const [fetched, setFetched] = useState(false);

  const signup = (username, password, firstname, lastname, phonenumber) => {
    return auth
      .signup(username, password, firstname, lastname, phonenumber)
      .then((data) => {
        setUser(data.user);
      });
  };

  const login = (email, password) => {
    return auth.login(email, password).then((data) => {
      setUser(data.user);
    });
  };

  const logout = async () => {
    setUser(null);
    await auth.logout();
  };

  const getUser = () => {
    auth.getUser().then((newUser) => {
      console.log("user", newUser);
      setUser(newUser);
      setIsLoading(false);
    });
  };

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
        isLoading,
        signup,
        login,
        logout,
        getUser,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider };
