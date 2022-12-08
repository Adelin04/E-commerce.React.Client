import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import styledComponents from "styled-components";
import Button from "./Button";

//  Footer component
const Footer = () => {
  return (
    <Wrapper>
      <div className="wrapper-social-newsletter">
        <div className="wrapper-icon-social">
          <div style={{ display: "flex", width: "100%" }}>
            <p>
              <FaFacebook className="facebook-icon" />
            </p>
            <p>
              <FaInstagram className="instagram-icon" />
            </p>
            <p>
              <FaYoutube className="youtube-icon" />
            </p>
            <p>
              <FaMailBulk className="email-icon" />
            </p>
          </div>

          <div className="wrapper-copyright">
            <p className="copyright">
              Made In Romania. © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="title">
            <h4>Newsletter</h4>
          </div>

          <div className="wrapper-footer-abonare">
            <input
              className="footer-input-abonare"
              placeholder="Email address"
            />
          </div>

          <div className="footer-acord">
            <input className="footer-input-checkbox" type="checkbox" />
            <p>I agree with all the terms and conditions</p>
          </div>

          <Button
            style={{
              widt: "auto",
              height: "auto",
              margin: "5px",
            }}
            textBtn={"Subscribe"}
            onClick={() => console.log('subscribe')}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styledComponents.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: auto;
    margin:0px auto;
    background-color: var(--baseColor);
    // background-color: #d6bbd3;
    
    .wrapper-social-newsletter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: auto;
      margin: auto;
    }

.footer-newsletter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
  flex-direction: column;
  width: 100%;
  min-height: 150px;
  margin: auto;
}

.footer-newsletter h4 {
  margin: 10px;
}

.wrapper-footer-abonare {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
  
}

.footer-input-abonare {
  display: flex;
  justify-content: center;
  text-align: center;
  text-align: center;
  width: 50%;
  margin: 5px;
  border: none;
  border-bottom: 2px solid;
  outline: none;
}

.footer-acord {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0px;
  font-size: 12px;
  width: 100%;
  margin-top: 15px;
}

.footer-acord p {
  display: flex;
  justify-content: center;
  text-align: center;
  text-align: center;
  width: 30%;
  margin: 0px;
}

.footer-input-checkbox {
  display: flex;
  justify-content: center;
  text-align: center;
  text-align: center;
  cursor: pointer;
}


.wrapper-footer-abonare {
  position: relative;
  width: 100%;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  margin: 5px;
  padding: 5px;
  width: 220px;
}

.wrapper-icon-social{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 100%;
}

.wrapper-icon-social p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.facebook-icon,
.instagram-icon,
.youtube-icon,
.email-icon {
font-size: 25px;
}

.facebook-icon,
.instagram-icon,
.youtube-icon,
.email-icon:hover {
cursor: pointer;
}

.copyright {
  text-align: center;
  font-size: 15px;
  margin: 5px;
}


@media only screen and (max-width:600px) {
  .wrapper-social-newsletter
  {
    justify-content: space-between;
    flex-direction:column;
  }
}
`;
