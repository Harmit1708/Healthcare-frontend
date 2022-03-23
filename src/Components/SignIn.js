import React, { useState, useEffect } from "react";
import desktopImage from "../Assets/pexels-cátia-matos-1072179.jpg";
import mobileImage from "../Assets/pexels-dominika-roseclay-1141792.jpg";
import Name_logo from "../Assets/shopping-bags.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import password from "../Assets/password.png"
function Signin() {
  let navigate = useNavigate();
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

  // Write function to login
  let handleSubmit = async (values) => {
    // use axios to post the data
    let res = await axios.post("https://healthcare-products.herokuapp.com/users/signin", values);

    // If statusCode is 200 then condition wii be true and set token and name in sessionStorage and navigate to dashboard
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("firstName", res.data.firstName);
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short")
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });



  return (
    <div className="signin" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="signin-content">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div
            className="signin_body"
            style={{
              height: "500px",
              width: "550px",
              backgroundColor: "#ffffff",
              color: "black",
              borderRadius: "15px",
            }}
          >
            <h3 className="text-center mt-5">
              <img
                className="shooping_bag mb-3 mt-2"
                src={Name_logo}
                alt="Shooping_bag"
                style={{ height: "50px", width: "50px" }}
              />
              &nbsp;
              <Link to="/home" className="text-decoration-none ">
                <span style={{ textDecoration: "none", color: "black" }}>
                  Healthcare
                </span>
              </Link>
            </h3>
            <h4 className="text-center mt-4">Sign In</h4>
            <p className="text-muted text-center">Continue with Healthcare</p>
            <input
              className="form-control form-group shadow-none gmail_icon pl-5"
              id="email"
              style={{ margin: "0 auto", width: "70%", height: "10%" }}
              type="email"
              name="email"
              placeholder="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            >
            </input>{formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red",marginLeft:"85px" }}>{formik.errors.email}</div>
              ) : null}
            <br></br>
            <input
              className="form-control form-group shadow-none password_icon pl-5"
              id="password"
              style={{ margin: "0 auto", width: "70%", height: "10%" }}
              type="password"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            >
            </input>
            {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red",marginLeft:"85px" }}>{formik.errors.password}</div>
              ) : null}
            <br></br>
            <input
              className="btn-success form-group form-control shadow-none"
              style={{ margin: "0 auto", width: "70%", height: "10%" }}
              type="submit"
              value="Sign In"
            ></input>
            <div
              className="new"
              style={{ marginLeft: "85px", marginTop: "10px" }}
            >
              <span className="text-left">New to Healthcare?&nbsp;</span>
              <Link
                to="/signup"
                className="text-decoration-none"
                style={{ color: "green" }}
              >
                Get Started
              </Link>
              <br></br>
            <span>Demo Credentials</span><br></br>
            <span className="text-dark">Email:user@gmail.com</span> &nbsp;&nbsp;  
            <spanp className="text-dark">Password:user@123</spanp>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
