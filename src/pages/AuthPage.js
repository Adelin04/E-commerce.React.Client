import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styledComponents from "styled-components";

//Components
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  //Fields
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper>
      <div className="auth">
        <div className="wrapper-login">
          <NavLink className="title-login" to={"/"}>
            {"BUTIQUE"}
          </NavLink>
          {/* <Logo /> */}

          {toggle ? (
            <div>
              <Register />
              <p
                style={{
                  textAlign: "center",
                  margin: "auto",
                  padding: "5px",
                }}
              >
                Ai cont ?{" "}
                <span
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  style={{
                    color: "skyBlue",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Login
                </span>
              </p>{" "}
            </div>
          ) : (
            <div>
              <Login />{" "}
              <p
                style={{
                  textAlign: "center",
                  margin: "auto",
                  padding: "5px",
                }}
              >
                Nu ai cont ?{" "}
                <span
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  style={{
                    color: "skyBlue",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Inscrie-te
                </span>
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default AuthPage;

const Wrapper = styledComponents.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items : center;
height:100%;

  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
    height: 100%;
    margin: auto;
    //  background-color: burlywood;
  }

  /* .header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: auto;
  } */

  .wrapper-login {
    margin: auto;
    max-width: 400px;
    height: auto;
    border: 1px solid rgba(128, 128, 128, 0.597);
    border-radius: 10px;
    box-shadow: -1px 0 rgba(0, 0, 0, 0.118), 0 3px rgba(0, 0, 0, 0.118), 3px 0 rgba(0, 0, 0, 0.118), 0 -1px rgba(0, 0, 0, 0.118);
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px auto;
  }

  .title-login {
    display :flex;
    justify-content: center;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-weight: bolder;
    text-align: center;
    font-size: 25px;
    margin: 5px auto;
    color:black;
    text-decoration :none;
}

`;
