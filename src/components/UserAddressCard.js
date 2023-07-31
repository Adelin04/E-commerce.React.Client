import React from "react";

const UserAddressCard = ({ address = [], setCurrentIdClicked }) => {
  return (
    <div className="container-user-address-card flex w-full m-2">
      {address &&
        address.map((address) => {
          return (
            <div
              key={address.id}
              value={address.id}
              onClick={(e) => setCurrentIdClicked(address.id)}
              className="user-address-card bg-neutral-200 p-2 m-2 rounded-lg"
            >
              <p>{address.firstName}</p>
              <p>{address.lastName}</p>
              <p>{address.email}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.street}</p>
              <p>{address.zipCode}</p>
              <p>{address.phone}</p>
            </div>
          );
        })}
    </div>
  );
};

export default UserAddressCard;
