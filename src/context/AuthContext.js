import React, { createContext, useState, useContext, useEffect } from "react";
import * as auth from "../apis/auth";
// import Loading from "../components/Loading";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
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

  const getUser = () => {
    auth.getUser().then((user) => {
      console.log("user", user);
      // return user;
      setUser(user);
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
        signUp,
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
