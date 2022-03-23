import React, { Fragment, useContext,useEffect } from "react";
import { healthCareContext } from "../App";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../Components/Header";
import Eatright from "../Assets/eat_right.png";
import Textback from "../Assets/pngwing.com.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Home() {
  let context = useContext(healthCareContext);

  let navigate = useNavigate();

  // Declare Function inside UseEffect
  useEffect(()=>{
    checkAuth()
  })

  // Create Function for check authentication
  let checkAuth = async() => {
    // get token from sessionStorage
    let token = sessionStorage.getItem('token')
    // token is present then condition will be true 
    // token is not present then condition will be false and direct jump into else part and navigate to login page
    if(token){
      let config = {
        headers:{
          token:token
        }
      }
      // Post data to url
      let res = await axios.post("https://healthcare-products.herokuapp.com/users/auth",{
        Purpose:"Approve"
      },config)
      // If statuscode is not equal to 200 then condition will be true and sessionStorage is clear and navigate to login page
      if(res.data.statusCode !== 200 ){
        alert("Session Ended")
        sessionStorage.clear()
        navigate("/")
      }
    }
    else
    {
      navigate('/')
    }
  }


  return (
    <div className="home" style={{ backgroundColor: "#eff5ee",minWidth:"1200px" }}>
      {/* Header */}
      <Header />
      <Container fluid>
        <div
          className="mt-5 ml-5 mr-5"
          style={{ backgroundColor: "rgba(255,255,255,0.5)", height: "500px" }}
        >
          <div
            className="fixed"
            style={{ display: "grid", gridTemplateColumns: "6fr 6fr" }}
          >
            <div
              className="start_part m-auto textimg"
              style={{ margin: "0 auto",paddingBottom: "50px",backgroundImage: `url(${Textback})`,opacity:"0.7"}}
            >
              <h3
                className="text-center gfont1 text-wrap mt-5 display-1 d-flex flex-wrap"
                style={{ fontSize: "50px", marginLeft: "50px",backgroundColor:"transparent" }}
              >
                Let's build wellness rather than treating disease
              </h3>
            </div>

            <div className="end_part m-auto">
              <img
                className="responsive"
                src={Eatright}
                alt="eat_right"
                style={{ height: "500px", width: "100%", minWidth: "400px" }}
              ></img>
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <span className="text-muted" style={{ letterSpacing: "2px" }}>
            Shop By Category
          </span>
          <h1>Our Categories</h1>
        </div>
        <div
          className="homegrid container text-decoration-none"
          style={{
            display: "grid",
            wrap: "wrap",
            gridTemplateColumns: "6fr",
            textAlign: "center",
            marginTop: "50px",
            width: "1100px",
            minWidth: "400px",
          }}
        >
          {context.data.map((e, i) => {
            return (
              <Fragment key={i}>
                <div
                  className="home-item-wrapper justify-content-center p-3"
                  style={{
                    textDecoration: "none",
                    height: "350px",
                    background: "rgba(255,255,255,0.5)",
                    display: "grid",
                    gridGap:"20px",
                    gridTemplateColumns: "6fr 6fr",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    let dataprint = context.data.findIndex(
                      (f) => f.name === e.name
                    );
                    context["dataprint"] = dataprint;
                  }}
                >
                  <div className="m-3 lead text-dark   ">
                    <h3 className="float-left">{e.name}</h3>
                    <hr className="mt-5"></hr>
                    <p
                      style={{
                        textAlign: "left",
                        width: "650px",
                        minWidth: "400px",
                      }}
                    >
                      {e.description}
                    </p>
                    <Link
                      to={`/` + e.name.replace(/ /g, "").toLowerCase()}
                      className="text-decoration-none float-left mt-5" 
                    >
                      <button className="btn shopbtn bouncy shadow-none text-white" style={{backgroundColor:"black",height: "45px",width:"145px"}}>Shop Now<ArrowForwardIcon aria-hidden="true" className="arrow1"/></button>
                    </Link>
                  </div>
                  <img
                    className="home-image float-right ml-auto"
                    style={{
                      marginTop: "10px",
                      borderRadius: "10px",
                      height: "300px",
                      width: "350px",
                    }}
                    src={e.image}
                    alt={e.name}
                  ></img>
                </div>
                <hr style={{ height: "5px", borderRadius: "15px" }}></hr>
              </Fragment>
            );
          })}
        </div>
        <footer>
          <h5 className="bg-dark text-light text-center">
            @2022 Health Care Products
          </h5>
        </footer>
      </Container>
    </div>
  );
}
export default Home;
