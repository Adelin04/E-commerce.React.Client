import React from "react";

interface PropsAddressCard {
    address: Array<any> | null,
    setCurrentIdClicked: (params: any) => any;
}

const AddressCard = ({ address, setCurrentIdClicked }: PropsAddressCard) => {
    return (
        <div className="container-user-address-card flex justify-center items-center w-full m-2">
            {address &&
                address.map((address) => {
                    return (
                        <div
                            key={address.id}
                            // value={address.id}
                            onClick={(e) => setCurrentIdClicked(address.id)}
                            className="user-address-card bg-neutral-200 p-2 m-2 rounded-md border border-[var(--sliderColor)] cursor-pointer"
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

export default AddressCard;