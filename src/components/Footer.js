import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import styledComponents from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";

//  Footer component
const Footer = () => {
  const [emailSubscriber, setEmailSubscriber] = useState('')

  return (
    <div className="container-social-newsletter flex flex-row justify-around w-full h-max my-0 mx-auto  bg-[var(--baseColor)]">

      <div className="container-social-footer flex flex-col justify-center items-center w-[35%] p-2">

        <div className="wrapper-social-footer flex flex-row w-full h-[70%] justify-around items-center sm:flex-col flex-wrap">
          <Link to={'/'} className="w-max h-max">
            <FaFacebook className="facebook-icon flex justify-center items-center w-8 h-max" />
          </Link >
          <Link to={'/'} className="w-max h-max">
            <FaInstagram className="instagram-icon flex justify-center items-center w-8 h-max" />
          </Link >
          <Link to={'/'} className="w-max h-max">
            <FaYoutube className="youtube-icon flex justify-center items-center w-8 h-max" />
          </Link >
          <Link to={'/'} className="w-max h-max">
            <FaMailBulk className="email-icon flex justify-center items-center w-8 h-max" />
          </Link >
        </div>

        <div className="wrapper-copyright-footer flex flex-row w-full h-[30%] justify-center items-center">
          <p className="copyright flex justify-center items-center w-max h-max text-center">
            Made In Romania. © {new Date().getFullYear()}
          </p>
        </div>

      </div>

      <div className="container-newsletter-terms-footer flex flex-col justify-center items-center w-[55%] p-2">

        <h3 className="title-newsletter-footer flex justify-center items-center text-lg font-bold p-2"> Newsletter </h3>

        <input
          className="input-abonare-footer flex bg-[var(--baseColor)] w-[35%] text-center outline-none border-b-2 border-red-400"
          placeholder="Email address"
          value={emailSubscriber}
          id={emailSubscriber}
          type={"email"}
          onChange={(e) => setEmailSubscriber(e.target.value)}
        />

        <div className="acord-terms-footer flex flex-col justify-center items-center text-center">
          <input className="input-checkbox-footer m-2" type="checkbox" />
          <p>I agree to all terms and conditions</p>
          <p className="termsAndCondition flex justify-center items-start w-max h-7 hover:border-b-2 border-red-400">
            <Link to={'/termsAndCondition'}>Read the terms and conditions</Link>
          </p>
        </div>

        <Button
          className="hover:border-2 border-rose-600 min-w-[50%] min-h-[30px] m-[15px]"
          textBtn={"Subscribe"}
          onClick={() => console.log('send the email confirmation')}
        />

      </div>

    </div>
  );
};

export default Footer;