import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import { login } from "../Features/UserSlice";
import { URI } from "../_Utils/Dependency";
import Button from "./Button";
import jwt_decode from "jwt-decode";
import { addProductToShoppingCart } from "../Features/ShoppingCartSlice";
import { SerializeProduct } from "../_Utils/SerializeProduct";
import { selectProduct } from "../Features/ProductSlice";

//  Login component
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { products } = useSelector(selectProduct);

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

    await fetch(`${URI}Auth/v1/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { success, token, basketByUser } = data;

        let TMP_USER = [];
        let TMP_BASKET = [];

        if (success) {
          token && localStorage.setItem("TOKEN_ACCES", `Bearer ${token}`);

          basketByUser && JSON.stringify(basketByUser.items.map(product => {
            TMP_BASKET.push({ productId: product.productId, quantity: product.quantity, size: product.size })
          }
          ))
          localStorage.setItem("BASKET", JSON.stringify(TMP_BASKET));
          // basketByUser && localStorage.setItem("BASKET", `${JSON.stringify(basketByUser.items.map(product =>

          //   [{ productId: product.productId, quantity: product.quantity, size: product.size }]))

          //   }`)

          const decoded_user = jwt_decode(token); // decode your token here
          for (const claim in decoded_user) {
            if (Object.hasOwnProperty.call(decoded_user, claim)) {
              TMP_USER.push(decoded_user[claim]);
            }
          }

          dispatch(
            login({
              user: {
                email: TMP_USER[2],
                firstName: TMP_USER[0],
                lastName: TMP_USER[1],
                role: [TMP_USER[3]],
                timeExpirationsToken: TMP_USER[4],
              },
              token: token,
            })
          );
          
          goHome();
          setMsgButton("Login");
        }
      })
      .catch((error) => {
        setError(error);
        setMsgButton("Login");
      })
  };

  return (
    <div className="login flex flex-col justify-center items-center">

      <div
        className="msg-response flex justify-center items-center p-1 m-auto w-full h-auto font-bold text-[18px] text-error ">
        {error && error}
      </div>

      <form className="form-content flex flex-col w-full max-w-[400px] h-full" onSubmit={handleSubmit}>

        <label htmlFor="email" className="email flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Email</label>
        <input
          className="input-dataUser email flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)]"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus={true}
          required
          type="email"
          id="email"
        />

        <label htmlFor="password" className="password flex justify-center items-center p-1 my-1 mx-auto font-bold text-[15px]">Password</label>
        <input
          className="input-dataUser password flex justify-center items-center my-0 mx-auto w-full text-[15px] text-center font-bold outline-none border-b-2 border-[var(--baseColor)]"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          id="password"
        />

        <div className="wrapper-btn-login flex justify-center items-center m-1 p-2 w-max mx-auto ">
          <Button textBtn={msgButton} className={'btn-login  flex justify-center items-center w-[100px] h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
        </div>

      </form>

    </div>
  );
};

export default Login;