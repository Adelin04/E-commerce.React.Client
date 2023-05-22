import React from "react";
import Button from "./Button";
import settingUser from "../icons/settingUser.ico";
import styledComponents from "styled-components";

import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { resetBasket } from "../Features/ShoppingCartSlice";

const PopUp_ProfileUser = ({ user, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = toggle;

  return (
    <div className={`${open ?
      "flex flex-col justify-center items-center w-[170px] h-[120px] rounded-lg bg-baseColor transition ease-linear duration-[1s]"
      :
      "invisible w-0 h-0 transition-all duration-[1s]"
      } `}>

      <div className={`${open ?
        "flex flex-col justify-around items-center w-[170px] h-[120px] rounded-lg bg-baseColor transition duration-[1s]"
        :
        "invisible w-0 h-0"
        } `}>


        <div className="user-name flex text-[20px] font-bold">
          <span>
            {user && user.firstName} {user && user.lastName}
          </span>

        </div>

        <div className={"admin"}>
          {user && user.role[0].includes("ADMIN") ? (
            <Button
              className={"flex justify-center items-center w-max h-7 p-1 m-1 font-bold hover:border-2"}
              textBtn={"Dashboard Admin"}
              onClick={() => navigate("/admin/dashboard")}
            />
          ) : null}
        </div>

        <div className="btn-login-logout flex justify-center  items-center w-full">

          <div className="go-setting flex justify-center items-center w-[30%] p-1 m-1">
            <Link to={"/user/setting"}>
              <img
                style={{ width: "20px", height: "auto" }}
                src={settingUser}
              />
            </Link>
          </div>

          {user ? (
            <Button
              className={"flex justify-center items-center w-[50%] h-7  p-1 m-1 hover:border-2"}
              textBtn={"Logout"}
              onClick={() => { dispatch(logout()); dispatch(resetBasket()) }}
            />
          ) : (
            <Button
              className={"flex justify-center items-center w-full h-6  p-1 m-1 hover:border-2"}
              textBtn={"Login"}
              onClick={() => navigate("/auth")}
            />
          )}
        </div>

      </div>


    </div>
  );
};

export default PopUp_ProfileUser;
