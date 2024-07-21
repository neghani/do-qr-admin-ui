import { useEffect, useState } from "react";

import Login from "../pages/Login";

const AuthGuard = ({ component }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setToken(token);
  }, []);

  return (
    <> {!token || token == "" ? <a href="/login">Login </a> : component} </>
  );
};

export default AuthGuard;
