import React, { useState } from "react";
import { Navigate, Router, useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import AuthPage from "../pages/AuthPage";
import { URI } from "../_Utils/Dependency";
import Button from "./Button";

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgButton, setMsgButton] = useState("Register");
  const [error, setError] = useState(null);

  const goToLoginComponent = () => {
    window.location.reload(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    if (password === confirmPassword) {
      setMsgButton("Loading...");
      await fetch(`${URI}api/Auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { message, succes } = data;

          if (succes) {
            setError(null);
            goToLoginComponent();
          } else setError(message);
        })
        .catch((error) => {
          setError(error.toString());
        })
        .finally(() => setMsgButton("Register"));
    } else setError("Password confirmation is different from password");

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Wrapper>
      <div
        className="msg-response"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          color: "red",
          padding: "15px",
        }}
      >
        {error && error}
      </div>

      <form className="form-content" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          className="input-dataUser"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          autoFocus={true}
          required
          type="text"
          id="firstName"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="input-dataUser"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          autoFocus={true}
          required
          type="text"
          id="lastName"
        />

        <label htmlFor="email">Email</label>
        <input
          className="input-dataUser"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus={true}
          required
          type="email"
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="input-dataUser"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          id="password"
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          className="input-dataUser"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          type="password"
          id="confirmPassword"
        />

        <div className="button">
          <Button textBtn={msgButton} />
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styledComponents.div`
label{
  display: block;
  margin: 0px auto;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}

.input-dataUser {
  display: block;
  margin: 0px auto;
  width: 50%;
}

.input-dataUser {
  width: 300px;
  height: auto;
  margin-bottom: auto;
  border: none;
  border-bottom: 2px solid var(--baseColor);
  font-size: 20px;
  text-align: center;
  background-color: transparent;
  outline: none;
}

.login,
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 350px;
  height: auto;
  /* background-color: aqua; */
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  max-width: 400px;
  height: auto;
  /*   margin-top: 250px; */
}

.button{
  margin-top: 5px;
}

@media only screen and (max-width: 320px) {
  label{
    display: block;
    margin: 0px auto;
    text-align: center;
    /* margin-top: 20px; */
    font-size: 15px;
    font-weight: bold;
  }
  
  .input-dataUser {
    width: 200px;
    height: auto;
    margin-bottom: auto;
    border: none;
    border-bottom: 2px solid var(--mySalmon);
    font-size: 25px;
    text-align: center;
    background-color: transparent;
    outline: none;
  }
}
`;
