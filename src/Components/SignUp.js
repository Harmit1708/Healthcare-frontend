import React, { useState, useEffect } from "react";
import desktopImage from "../Assets/pexels-cátia-matos-1072179.jpg";
import mobileImage from "../Assets/pexels-dominika-roseclay-1141792.jpg";
import Name_logo from "../Assets/shopping-bags.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Signin() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  let navigate = useNavigate();

  // Write function to signup
  let handleSubmit = async (values) => {
    // use axios for post the data in database
    let res = await axios.post("https://healthcare-products.herokuapp.com/users/signup", values);
    // If statuscode is 200 then condition will be true and redirect to the login page
    if (res.data.statusCode === 200) {
      navigate("/signin");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastname: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required("No Password Provided"),
      cpassword: Yup.string()
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="signup" style={{ backgroundImage: `url(${imageUrl})` }}>
      <form className="signup-content" onSubmit={formik.handleSubmit} autoComplete="off">
        <div
          className="signup_body"
          style={{
            height: "725px",
            width: "550px",
            backgroundColor: "#ffffff",
            color: "black",
            borderRadius: "15px",
          }}
        >
          <h3 className="text-center heading mt-5">
            <img
              className="shooping_bag mb-3"
              src={Name_logo}
              alt="Shooping_bag"
              style={{ height: "50px", width: "50px" }}
            />
            &nbsp;
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Healthcare
            </Link>
          </h3>
          <h4 className="text-center mt-4">Create a Healthcare ID</h4>
          <p className="text-muted text-center">
            The E-commerce platform made for you
          </p>
          <input
            className="form-control shadow-none gmail_icon pl-5"
            style={{ margin: "0 auto", width: "70%", height: "7%" }}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", marginLeft: "85px" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <br></br>
          <input
            className="form-control shadow-none firstname_icon pl-5"
            style={{ margin: "0 auto", width: "70%", height: "7%" }}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          ></input>
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ color: "red", marginLeft: "85px" }}>
              {formik.errors.firstName}
            </div>
          ) : null}
          <br></br>
          <input
            className="form-control shadow-none lastname_icon pl-5"
            style={{ margin: "0 auto", width: "70%", height: "7%" }}
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
          ></input>
          {formik.touched.lastname && formik.errors.lastname ? (
            <div style={{ color: "red", marginLeft: "85px" }}>
              {formik.errors.lastname}
            </div>
          ) : null}
          <br></br>
          <input
            className="form-control shadow-none password_icon pl-5"
            style={{ margin: "0 auto", width: "70%", height: "7%" }}
            id="password"
            name="password"
            type="password"
            placeholder="Passworrd"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", marginLeft: "85px" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <br></br>
          <input
            className="form-control shadow-none confirmpassword_icon pl-5"
            style={{ margin: "0 auto", width: "70%", height: "7%" }}
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Passworrd"
            autocomplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cpassword}
          ></input>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <div style={{ color: "red", marginLeft: "85px" }}>
              {formik.errors.cpassword}
            </div>
          ) : null}
          <br></br>
          <input
            className="btn-success form-control shadow-none"
            style={{
              margin: "0 auto",
              width: "70%",
              height: "7%",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            type="submit"
            value="Create Healthcare ID"
          ></input>
          <div
            className="new"
            style={{ marginLeft: "85px", marginTop: "10px" }}
          >
            <span className="text-left">
              Already Have a Healthcare ID?&nbsp;
            </span>
            <a
              href="/signin"
              className="text-decoration-none"
              style={{ color: "green" }}
            >
              Sign In
            </a>
            <br></br>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
