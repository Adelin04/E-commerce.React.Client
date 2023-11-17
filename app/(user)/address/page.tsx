'use client'

import React from "react";
import { useState } from "react";
import AddressCard from "../../component/addressCard";
import { useUserStore } from "@/zustandStore/usersStore";
import AddressForm from "../../component/addressForm";

const AddressPage = () => {
  const { user, addresses } = useUserStore(state => state);

  const [error, setError] = useState(null);
  const [currentIdClicked, setCurrentIdClicked] = useState(null);


  return (
    <div className="addressPage flex flex-col justify-between items-center h-auto w-full">

      <div>{error && error}</div>

      <div className="wrapper-address flex flex-col justify-center items-center w-full h-max mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex w-full h-max mx-auto">
            {user && (
              <AddressCard
                address={addresses}
                setCurrentIdClicked={setCurrentIdClicked}
              />
            )}
          </div>

          <h3 className="flex justify-center items-center w-full p-1 font-bold text-[20px]">
            Delivery Address
          </h3>
          <hr className="hr-address m-4 w-full" />
        </div>

        <AddressForm selectedAddress={addresses?.filter((address: any) => address.id === currentIdClicked) || null} />
      </div>

    </div>
  );
};

export default AddressPage;