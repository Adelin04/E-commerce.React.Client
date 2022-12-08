import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import { login } from "../Features/UserSlice";
import { URI } from "../_Utils/Dependency";
import Button from "./Button";
import jwt_decode from "jwt-decode";

//  Login component
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgButton, setMsgButton] = useState("Login");
  const [error, setError] = useState(null);

  const goHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    setMsgButton("Loading");
    await fetch(`${URI}api/Auth/v1/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { success, token } = data;
        let TMP_USER = [];
        if (success) {
          localStorage.setItem("TOKEN_ACCES", `Bearer ${token}`);
          const decoded_user = jwt_decode(token); // decode your token here
          for (const claim in decoded_user) {
            if (Object.hasOwnProperty.call(decoded_user, claim)) {
              TMP_USER.push(decoded_user[claim]);
            }
          }

          dispatch(
            login({
              user: {
                email: TMP_USER[7],
                firstName: TMP_USER[0],
                lastName: TMP_USER[1] ,
                role: [TMP_USER[3]],
                timeExpirationsToken: TMP_USER[4],
              },
              token: token,
            })
          );
          goHome();
        } else {
          const { message } = data;
          message && setError(message);
          setMsgButton("Login");
        }
      })
      .catch((error) => {
        setError(error);
        setMsgButton("Login");
      });
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
        <div className="button">
          <Button textBtn={msgButton} />
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styledComponents.div`

.msg-response{
  display: flex;
  justify-content: center;
  margin: auto;
  color: red;
  padding: 15px;
}

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
    border-bottom: 2px solid var(--baseColor);
    font-size: 25px;
    text-align: center;
    background-color: transparent;
    outline: none;
  }
}
`;
