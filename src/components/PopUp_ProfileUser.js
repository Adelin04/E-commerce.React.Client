import React from "react";
import Button from "./Button";
import settingUser from "../icons/settingUser.ico";
import styledComponents from "styled-components";

import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const PopUp_ProfileUser = ({ user, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = toggle;

  return (
    <Wrapper>
      <div className={`${open ? "open" : "close"}`}>
        <div
          className={
            "wrapper-setting-username" + `${open ? " visible" : " hidden"}`
          }
        >
          <div className="go-setting">
            <Link to={"/user/setting"}>
              <img
                style={{ width: "20px", height: "auto" }}
                src={settingUser}
              />
            </Link>
          </div>

          <div className="user-name">
            <span>
              {user && user.firstName} {user && user.lastName}
            </span>
          </div>
        </div>


        <div className={"wrapper-btns" + `${open ? " visible" : " hidden"}`}>
          <div className={"admin"}>
            {user && user.role[0].includes("ADMIN") ? (
              <Button
                style={{ margin: "2px", width: "auto", height: "auto" }}
                textBtn={"Dashboard Admin"}
                onClick={() => navigate("/admin/dashboard")}
              />
            ) : null}
          </div>
          <div className="btn-logout">
            {user ? (
              <Button
                style={{ margin: "2px", width: "auto", height: "auto" }}
                textBtn={"Logout"}
                onClick={() => dispatch(logout())}
              />
            ) : (
              <Button
                style={{ margin: "2px", width: "auto", height: "auto" }}
                textBtn={"Login"}
                onClick={() => navigate("/auth")}
              />
            )}
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

export default PopUp_ProfileUser;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: auto;
    height: auto;
    
    .open {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 150px;
      height: 120px;
      border-radius: 5px;
      background-color: var(--baseColor); 
      transition: width,height 1s;
    }
    
    .close {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 0px;
      height: 0px;
      transition: all 1.5s;
    }
    
    .wrapper-setting-username{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width:100%; 
    }
    
    .user-name {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto; 
    }
    
    .go-setting a{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .wrapper-btns {
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
    }

    .wrapper-setting-username.visible,
    .wrapper-btns.visible {
      height: auto;
      visibility: visible;
      transition: all 1s;
    }
    
    .wrapper-setting-username.hidden,
    .wrapper-btns.hidden {
      height: 0px;
      visibility: hidden;
      transition: visibility 0.3s;
    }
`;
