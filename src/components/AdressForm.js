import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import CardTotalPay from "./CardTotalPay";
import { useSelector } from "react-redux";
import { selectShoppingCart } from "../Features/ShoppingCartSlice";
import { Link } from "react-router-dom";
import { URI } from "../_Utils/Dependency";

const AddressForm = () => {
  const { shoppingCartList, nrProducts, totalPrice, currency } =
    useSelector(selectShoppingCart);

  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [notes, setNotes] = useState(null);
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState(false);

  const handleOnClick = async () => {
    const dataCustomer = {
      firstName,
      lastName,
      email,
      country,
      city,
      zipCode,
      phone,
      notes,
    };

    if (validated) {
      await fetch(`${URI}Invoice/v1/datainvoice`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(dataCustomer),
      })
        .then((res) => res.json())
        .then((data) => console.log("data", data))
        .catch((error) => console.error(error));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className=" flex justify-center items-center w-full h-full m-2">
      <Form
        className="flex flex-col justify-between items-center w-full h-full p-1"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-[80%]">
          <h3 className="flex justify-center items-center  w-full p-1   font-bold text-[20px]">
            Delivery Address
          </h3>
          <hr className="hr-address m-4 w-full" />
        </div>

        <Row className="flex flex-col justify-center items-center mb-4 w-full m-3">
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom01"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            <Form.Control.Feedback> Looks good!</Form.Control.Feedback>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom02"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback className='flex justify-center items-center  w-full my-auto mx-2 p-1'>Looks good!</Form.Control.Feedback> */}
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom03"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback className='flex justify-center items-center  w-full my-auto mx-2 p-1'>Looks good!</Form.Control.Feedback> */}
            <Form.Control
              required
              type="email"
              placeholder="Email"
              className="flex justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom03"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback type="invalid" className='flex justify-center items-center  w-full my-auto mx-2 p-1'> Please provide a valid city.</Form.Control.Feedback> */}
            <Form.Control
              type="text"
              placeholder="City"
              required
              className="flex justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            controlId="validationCustom04"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback type="invalid" className='flex justify-center items-center  w-full my-auto mx-2 p-1'> Please provide a valid state.</Form.Control.Feedback> */}
            <Form.Control
              type="text"
              placeholder="State"
              required
              className="flex flex-col justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            controlId="validationCustom05"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Label>Zip</Form.Label> */}
            {/* <Form.Control.Feedback type="invalid" className='flex justify-center items-center  w-full my-auto mx-2 p-1'>Please provide a valid zip.</Form.Control.Feedback> */}
            <Form.Control
              type="text"
              placeholder="Zip"
              required
              className="flex flex-col justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            controlId="validationCustom06"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback type="invalid" className='flex justify-center items-center  w-full my-auto mx-2 p-1'>Please provide a valid zip.</Form.Control.Feedback> */}
            <Form.Control
              type="number"
              placeholder="Phone"
              required
              className="flex flex-col justify-center items-center  w-full my-auto mx-2 p-1"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            controlId="validationCustom07"
            className="flex flex-col justify-center items-center  w-[50%] my-2 mx-2 p-1"
          >
            {/* <Form.Control.Feedback type="invalid" className='flex justify-center items-center  w-full my-auto mx-2 p-1'>Please provide a valid zip.</Form.Control.Feedback> */}
            <textarea
              type="text"
              placeholder="Notes"
              required
              className="flex flex-col justify-center items-center  w-full my-auto mx-2 p-1  border-gray-200 border-[1px] rounded-lg outline-none"
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>

          <div className="acord-terms-footer flex flex-col justify-center items-start text-center h-10 w-[50%] m-auto p-1">
            <Link
              to={"/termsAndCondition"}
              className="flex justify-center items-center text-red-400 w-max h-max hover:border-b-2 hover:border-red-400"
            >
              Read the terms and conditions
            </Link>
          </div>

          <Form.Group className="mb-3 flex flex-col justify-center items-start w-[50%] h-max  mx-2 p-1 ">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
        </Row>
        <Button
          className="flex justify-center items-center w-[150px] h-10 font-bold text-textBlack bg-[var(--sliderColor)]  border-none rounded-md  hover:bg-[var(--baseColor)] hover:text-white "
          type="submit"
          onClick={handleOnClick}
        >
          Next step
        </Button>
      </Form>
    </div>
  );
};

export default AddressForm;
