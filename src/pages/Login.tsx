import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithAxios } from "../controller/propertyController";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Log in a user using email and password
  const logIn = async () => {
    try {
      const session = await loginWithAxios({ username, password });
      localStorage.setItem("token", session.token);
      setPasswordError("Success");
      navigate("/");
    } catch (error: any) {
      setPasswordError(error.message);
      console.log(error);
    }
  };

  const onButtonClick = (e: any) => {
    e.preventDefault();
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === username) {
      setEmailError("Please enter your username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    logIn();
  };

  return (
    <main className="form-signin  m-auto">
      <form className="form-width" onSubmit={onButtonClick}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter your email here"
            onChange={(ev) => setUsername(ev.target.value)}
          />

          <label>Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label>Password</label>
        </div>
        <label className="errorLabel">{emailError}</label>
        <label className="errorLabel">{passwordError}</label>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </main>
  );
};

export default Login;
