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
      await fetch(`${URI}Auth/v1/register/newUser`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { message, success } = data;

          if (success) {
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
    <div className="login flex flex-col justify-center items-center w-full h-full">

      <div
        className="msg-response flex justify-center items-center p-1 m-auto w-full h-auto font-bold text-[18px] text-error ">
        {error && error}
      </div>

      <form className="form-content flex- justify-center items-center w-full" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="firstName  flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">First Name</label>
        <input
          className="input-dataUser firstName flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)]"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          autoFocus={true}
          required
          type="text"
          id="firstName"
        />

        <label htmlFor="lastName" className="lastName  flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Last Name</label>
        <input
          className="input-dataUser lastName flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)]"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          autoFocus={true}
          required
          type="text"
          id="lastName"
        />

        <label htmlFor="email" className="email flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Email</label>
        <input
          className="input-dataUser  email flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)]"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus={true}
          required
          type="email"
          id="email"
        />

        <label htmlFor="password" className="password  flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Password</label>
        <input
          className="input-dataUser  password flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)] "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          id="password"
        />

        <label htmlFor="confirmPassword" className="confirmPassword  flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Confirm Password</label>
        <input
          className="input-dataUser confirmPassword flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)] "
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          type="password"
          id="confirmPassword"
        />


        <div className="wrapper-btn-login flex justify-center items-center m-1 p-1 w-max mx-auto ">
          <Button textBtn={msgButton} className={'btn-login flex justify-center items-center w-[100px] h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
        </div>

      </form>

    </div>
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
