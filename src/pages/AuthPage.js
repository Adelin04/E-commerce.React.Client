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

    <div className="auth flex flex-col justify-center items-center h-full w-full">

      <div className="wrapper-auth flex flex-col justify-center items-center min-w-[300px] max-w-[400px]  h-max my-2 mx-auto 
              border-2 border-[rgba(128, 128, 128, 0.597)] rounded-[10px] 
              shadow-lg">

        <NavLink className="title-login flex justify-center items-center m-1 p-1 font-bold text-[25px]" to={"/"}>
          {"BOUTIQUE"}
        </NavLink>
        {/* <Logo /> */}

        {toggle ? (
          <div className=" flex flex-col justify-center items-center">

            <Register />

            <div className=" flex  justify-center items-center">
              <p
                style={{
                  textAlign: "center",
                  margin: "auto",
                  padding: "5px",
                }}
              >
                Do you have an acount ?{" "}
              </p>

              <button
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
              </button>

            </div>

          </div>

        ) : (

          <div className=" flex flex-col justify-center items-center">

            <Login />

            <div className=" flex  justify-center items-center">
              <p style={{
                textAlign: "center",
                margin: "auto",
                padding: "5px",
              }} > Don't you have an account?{" "}
              </p>{" "}

              <button
                onClick={() => {
                  setToggle(!toggle);
                }}
                style={{
                  color: "skyBlue",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </div>

          </div>
        )}

      </div>

    </div >

  );
};

export default AuthPage;
