import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import CardTotalPay from "./CardTotalPay";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingCart, resetBasket } from "../Features/ShoppingCartSlice";
import { Link, useNavigate } from "react-router-dom";
import { URI } from "../_Utils/Dependency";
import exclamation from "../icons/exclamation.png";
import { selectUser } from "../Features/UserSlice";

const AddressForm = ({ selectedAddress }) => {
  const dispatch = useDispatch();
  const { user, userAddress } = useSelector(selectUser);
  const { shoppingCartList } = useSelector(selectShoppingCart);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState(false);
  const [error, setError] = useState('');

  const resetField = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCountry("");
    setCity("");
    setZipCode("");
    setPhone("");
    setNotes("");
  };

  const existEmptyFields = (...fields) => {
    let emptyField = false;
    fields.map((element) => {
      if (element === "" || element === null || element === false) {
        emptyField = true;
      }
    });
    return emptyField;
  };

  const handleOnClick = async () => {
    const dataCustomer = {
      firstName,
      lastName,
      email,
      state: country,
      city,
      street,
      zipCode,
      phone,
      notes,
      saveAddress,
    };

    if (
      !existEmptyFields(
        firstName,
        lastName,
        email,
        country,
        city,
        street,
        zipCode,
        phone,
        checkTermsAndConditions
      )
    ) {
      await fetch(`${URI}Order/v1/dataOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataAddress: dataCustomer }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { success } = data;

          if (success) {
            user && deletedBasket()
            navigate("payment");
          }
        })
        .catch((error) => console.error(error))
        .finally(() => { resetField(); dispatch(resetBasket()); localStorage.getItem("BASKET") && localStorage.removeItem("BASKET") });
    }
  };

  const deletedBasket = async () => {
    let response = false;
    await fetch(`${URI}Basket/v1/delete/basketByUserEmail/${user && user.email}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        const { success } = data
        response = success
      })
      .catch(error => setError(error.message))

    return response;
  }

  const selectedUserAddress = () => {
    const userAddressFiltered = userAddress.userAddresses.filter(
      (address) => address.id === selectedAddress
    );

    console.log(userAddressFiltered[0].email);
    // setFirstName(user.firstName);
    // setLastName(user.lastName);
    // setEmail(userAddressFiltered[0].email);
    /*     setCountry(userAddressFiltered[0].state);
    setCity(userAddressFiltered[0].city);
    setZipCode(userAddressFiltered[0].zipCode);
    setPhone(userAddressFiltered[0].phone); */
  };

  // selectedAddress !== null && selectedUserAddress();

  return (
    <div className=" flex flex-col justify-center items-center w-full h-full m-2">
      {error && error}
      <div className="flex flex-col justify-between items-center w-full h-full p-1">
        <div className="flex flex-col justify-center items-center mb-4 w-full m-3">
          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              required
              type="text"
              placeholder="First name"
              className={
                "flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              }
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {firstName === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={lastName}
              type="text"
              placeholder="Last name"
              className={
                "flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              }
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            {lastName === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={email}
              type="email"
              placeholder="Email"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {email === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={city}
              type="text"
              placeholder="City"
              required
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            {city === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={street}
              type="text"
              placeholder="Street"
              required
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
            {street === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={country}
              type="text"
              placeholder="Country"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
            {country === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={zipCode}
              type="text"
              placeholder="Zip"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
            {zipCode === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <input
              value={phone}
              type="string"
              placeholder="Phone"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {phone === "" ? (
              <img
                width={35}
                height={35}
                src={exclamation}
                className="absolute right-0"
              />
            ) : null}
          </div>

          <div className="relative flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1">
            <textarea
              value={notes}
              type="text"
              placeholder="Notes"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1 border rounded-md"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>

          <div className="relative mb-3 flex flex-col justify-cecnter items-center w-[50%] h-max  mx-2 p-1 ">
            <div className="acord-terms-footer flex justify-center items-start text-center h-10 w-full m-auto p-1">
              <Link
                to={"/termsAndCondition"}
                className="flex justify-center items-center text-red-400 w-max h-max mx-0 hover:border-b-2 hover:border-red-400"
              >
                Read the terms and conditions
              </Link>
            </div>

            <div className="relative mb-3 flex flex-row-reverse justify-end items-center w-full h-[40px]  mx-auto p-1">
              <p className="flex flex-col justify-cecnter items-center mx-3">
                Agree to terms and conditions
              </p>
              <input
                className="flex flex-col justify-center items-center w-5 h-5 rounded-lg cursor-pointer"
                value={checkTermsAndConditions}
                type="checkbox"
                onChange={(e) => {
                  setCheckTermsAndConditions(e.target.checked);
                }}
              />

              {!checkTermsAndConditions && (
                <img
                  width={35}
                  height={35}
                  src={exclamation}
                  className="absolute right-0"
                />
              )}
            </div>

            {user && (
              <div className="relative mb-3 flex flex-row-reverse justify-end items-center w-full h-[40px]  mx-auto p-1">
                <p className="flex flex-col justify-cecnter items-center mx-3">
                  Save address
                </p>
                <input
                  className="flex flex-col justify-center items-center w-5 h-5 rounded-lg cursor-pointer"
                  value={checkTermsAndConditions}
                  type="checkbox"
                  onChange={(e) => {
                    setSaveAddress(e.target.checked);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <Button
          className="flex justify-center items-center w-[150px] h-10 font-bold text-textBlack bg-[var(--sliderColor)]  border-none rounded-md  hover:bg-[var(--baseColor)] hover:text-white "
          type="submit"
          onClick={handleOnClick}
        >
          go to pay
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;
