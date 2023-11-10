//import style
import style from '@/styles/auth.module.css'

import React, { MouseEventHandler, useState } from "react";
import { URI } from "../../../utils/globalUri";
import Button from "../button";

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgButton, setMsgButton] = useState("Register");
  const [error, setError] = useState('');

  const goToLoginComponent = () => {
    window.location.reload();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
            setError('');
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

      <form className={style.formLogin} onSubmit={handleSubmit}>
        <label htmlFor="firstName" className={style.labelLogin}>First Name</label>
        <input
          className={style.inputLoginRegister}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          autoFocus={true}
          required
          type="text"
          id="firstName"
        />

        <label htmlFor="lastName" className={style.labelLogin}>Last Name</label>
        <input
          className={style.inputLoginRegister}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          autoFocus={true}
          required
          type="text"
          id="lastName"
        />

        <label htmlFor="email" className={style.labelLogin}>Email</label>
        <input
          className={style.inputLoginRegister}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus={true}
          required
          type="email"
          id="email"
        />

        <label htmlFor="password" className={style.labelLogin}>Password</label>
        <input
          className={style.inputLoginRegister}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          id="password"
        />

        <label htmlFor="confirmPassword" className={style.labelLogin}>Confirm Password</label>
        <input
          className={style.inputLoginRegister}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          type="password"
          id="confirmPassword"
        />


        <Button textButton={"Register"} />

      </form>

    </div>
  );
};

export default Register;
