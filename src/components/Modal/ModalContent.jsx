import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function ModalContent(props) {
  const [isLogin, setIsLogin] = useState(true);

  const changeMode = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      {isLogin && <Login changeMode={changeMode} />}
      {!isLogin && <SignUp changeMode={changeMode} />}
    </>
  );
}
