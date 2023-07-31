import React from "react";
import AddressForm from "../components/AdressForm";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingCart } from "../Features/ShoppingCartSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserAddress, selectUser } from "../Features/UserSlice";
import { useState } from "react";
import { useEffect } from "react";
import { URI } from "../_Utils/Dependency";
import UserAddressCard from "../components/UserAddressCard";

const AddressPage = () => {
  const { user, userAddress } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [currentIdClicked, setCurrentIdClicked] = useState(null);

  useEffect(async () => {
    user &&
      (await fetch(`${URI}User/v1/get/userByEmail/${user.email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const { userAddresses } = data.userById;
          dispatch(getUserAddress({ userAddresses }));
        })
        .catch((error) => setError(error.message)));
  }, []);

  return (
    <div className="AddressPage flex flex-col justify-between items-center h-full w-full">
      <Header />

      <div>{error && error}</div>

      <div className="wrapper-address flex flex-col justify-center items-center w-full h-max mx-auto">
        <div className="flex flex-col w-[80%]">
          <div>
            {user && (
              <UserAddressCard
                address={userAddress.userAddresses}
                setCurrentIdClicked={setCurrentIdClicked}
              />
            )}
          </div>

          <h3 className="flex justify-center items-center w-full p-1 font-bold text-[20px]">
            Delivery Address
          </h3>
          <hr className="hr-address m-4 w-full" />
        </div>

        <AddressForm selectedAddress={currentIdClicked}/>
      </div>

      <Footer />
    </div>
  );
};

export default AddressPage;
