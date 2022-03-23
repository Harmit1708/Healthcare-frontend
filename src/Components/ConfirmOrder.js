import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import CloseIcon from "@mui/icons-material/Close";
import { healthCareContext } from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";

function ConfirmOrder() {
  let context = useContext(healthCareContext);

  let priceValue = context?.cartPrice
  let [getItem, setGetItem] = useState(context?.cart);
  
  let [flag, setFlag] = useState(false);

  let navigate = useNavigate();
  // Declare Function inside UseEffect
  useEffect(() => {
    checkAuth();
  }, []);

  // Create Function for check authentication
  let checkAuth = async () => {
    // get token from sessionStorage
    let token = sessionStorage.getItem("token");
    // token is present then condition will be true
    // token is not present then condition will be false and direct jump into else part and navigate to login page
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };
      // Post data to url
      let res = await axios.post(
        "https://healthcare-products.herokuapp.com/users/auth",
        {
          Purpose: "Approve",
        },
        config
      );
      // If statuscode is not equal to 200 then condition will be true and sessionStorage is clear and navigate to login page
      if (res.data.statusCode !== 200) {
        alert("Session Ended");
        sessionStorage.clear();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  let handleSubmit = async (values) => {
    // use axios to post the data into database
    let res = await axios.post(
      "https://healthcare-products.herokuapp.com/users/placeorder",
      values
    );
    // if res is present then condition will be true
    if (getItem) {
      // store order id inside the context
      context.orderID = res.data.order_id;
      navigate("/payment");
    }
    else
    { 
      alert("Add Product")
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      postalcode: '',
      phoneno: '',
      emailaddress: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      postalcode: Yup.number().required("Required"),
      phoneno: Yup.number().typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10).required("Required"),
      emailaddress: Yup.string().email('Invalid Email').required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div style={{ backgroundColor: "#f7f7f7", height: "auto" }}>
      <Header />

    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="container mt-2">
        <p
          className="text-center lead"
          style={{ fontSize: "30px", letterSpacing: "1px" }}
        >
          Confirm Order
        </p>
        <br></br>
        <div>
          <p
            className="text-left lead fw-bold"
            style={{ fontSize: "25px", letterSpacing: "1px" }}
          >
            Check Out
          </p>
          <p
            style={{
              backgroundColor: "#3d9cd2",
              color: "white",
              height: "53px",
              paddingTop: "14px",
              borderLeft: "10px solid #3485b3",
            }}
          >
            &nbsp;&nbsp;Have a Coupan?{" "}
            <span
              className="coupan text-decoration-none text-white"
              onClick={() => setFlag(true)}
            >
              Click here to enter your code
            </span>
          </p>
          {flag === true ? (
            <>
              <input
                className="form-control w-50 shadow-none"
                style={{ height: "50px" }}
                type="text"
                placeholder="Enter Coupan Code"
              ></input>
            </>
          ) : (
            <></>
          )}
        </div>
        <br></br>
        <div className="confirm">
          <div>
            <p
              className="text-left lead fw-bold"
              style={{ fontSize: "25px", letterSpacing: "1px" }}
            >
              Billing Details
            </p>
            <br></br>
              <div>
                <label>
                  First Name
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }}
                  id="firstname" name="firstname" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstname}/>{formik.touched.firstname && formik.errors.firstname?<div style={{color:"red"}}>{formik.errors.firstname}</div> : null}
                <br></br>
                <label>
                  Last Name
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }} id="lastname" name="lastname" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastname}/>{formik.touched.lastname && formik.errors.lastname?<div style={{color:"red"}}>{formik.errors.lastname}</div> : null}
                <br></br>
                <label>
                  Address
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }} id="address" name="address" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address}/>{formik.touched.address && formik.errors.address?<div style={{color:"red"}}>{formik.errors.address}</div> : null}
                <br></br>
                <label>
                  Town / City
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }} id="city" name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city}/>{formik.touched.city && formik.errors.city?<div style={{color:"red"}}>{formik.errors.city}</div> : null}
                <br></br>
                <label>
                  Postal Code
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }} id="postalcode" name="postalcode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.postalcode}/>{formik.touched.postalcode && formik.errors.postalcode?<div style={{color:"red"}}>{formik.errors.postalcode}</div> : null}
                <br></br>
                <label>
                  Phone No
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none w-50"
                  style={{ width: "auto" }} id="phoneno" name="phoneno" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phoneno}/>{formik.touched.phoneno && formik.errors.phoneno?<div style={{color:"red"}}>{formik.errors.phoneno}</div> : null}
                <br></br>
                <label>
                  Email Address
                  <span style={{ color: "red" }}>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="email"
                  className="form-control shadow-none w-50  "
                  style={{ width: "auto" }} id="emailaddress" name="emailaddress" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.emailaddress}/>{formik.touched.emailaddress && formik.errors.emailaddress?<div style={{color:"red"}}>{formik.errors.emailaddress}</div> : null}
              </div>
            
            <br></br>
          </div>
          <div
            className="img-fluid"
            style={{
              height: "700px",
              width: "600px",
              backgroundColor: "#ffffff",
              marginTop: "10px",
              border: "5px solid lightgrey",
            }}
          >
            <div>
              <p
                className="p-5 fw-bold"
                style={{ fontSize: "25px", letterSpacing: "1px" }}
              >
                Your Order
              </p>
              <span className="pl-5 fw-bold" style={{ letterSpacing: "2px" }}>
                Product
              </span>
              <span
                className="pr-5 fw-bold float-right"
                style={{ letterSpacing: "2px" }}
              >
                Subtotal
              </span>
              <hr className="ml-5 mr-5"></hr>
              {getItem.map((e, i) => {
                priceValue = priceValue + Number(e.price * e.q);
                return (
                  <div key={i}>
                    <span
                      className="pl-5  float-left"
                      style={{ letterSpacing: "1px" }}
                    >
                      {e?.name}
                    </span>
                    <span
                      className="pr-5 fw-bold float-right"
                      style={{ letterSpacing: "1px" }}
                    >
                      &#x20b9;{e?.price}
                    </span>
                    <br></br>
                    <p className="pl-5">
                      <CloseIcon style={{ height: "12px" }} />
                      {e?.q}
                    </p>
                  </div>
                );
              })}
              <hr className="ml-5 mr-5"></hr>
              <span className="pl-5 fw-bold">Subtotal</span>
              <span
                className="pr-5 fw-bold float-right"
                style={{ letterSpacing: "1px" }}
              >
                &#x20b9;{priceValue}
              </span>
              <br></br>
              <hr className="ml-5 mr-5"></hr>
              <span className="pl-5 fw-bold">Total</span>
              <span
                className="pl-5 fw-bold float-right pr-5"
                style={{
                  fontSize: "25px",
                  color: "#f2cb1f",
                  letterSpacing: "2px",
                }}
              >
                &#x20b9;{priceValue}
              </span>
              <br></br>
              <div className="float-center">
                <button
                  className="btn  mt-5 ml-5 mr-5 fw-bold"
                  type="submit"
                  style={{
                    maxWidth: "100%",
                    fontSize: "20px",
                    letterSpacing: "2px",
                    height: "50px",
                    width: "300px",
                    backgroundColor: "#f2cb1f",
                  }}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default ConfirmOrder;
