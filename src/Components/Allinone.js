import React, { useEffect, useContext, useState } from "react";
import { healthCareContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import AddIcon from '@mui/icons-material/Add';

function Allinone() {
  let context = useContext(healthCareContext);
  let [products, setProducts] = useState([]);

  let navigate = useNavigate();

  let getData = () => {
    if (context.data.length > 0 && context && context.data && context.data.length) {
      setProducts(context.data[context.dataprint].subItems);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getData();
  },[]);

  return (
    <div style={{backgroundColor:"#f7f7f7"}}>
    <Header/>
    <div className="text-center" style={{marginTop:"60px"}}>
      <span className="text-muted" style={{letterSpacing:"2px"}}>Shop Our New Releases</span>
      <h1>Our Products</h1>
    </div>
      <div
        className="container grid product m-auto"
        style={{
          gridGap:"25px",
          textAlign: "center",
          height:"auto"
        }}
      >
        {products.map((e, i) => {
          return (
            <div
              className="product-wrapper ml-auto mr-auto"
              key={i}
              style={{ marginTop: "80px",marginBottom:"50px", margin: "35px",height:"410px",width:"300px",backgroundColor:"#ffffff" }}
            >
              <img
                className="product-image animation"
                src={e.image} 
                alt={e.name}
                style={{
                  height: "250px",
                  width: "300px",
                }}
              ></img>
              <p className="float-left d-flex flex-column flex-wrap fw-bold ml-3 mt-3" style={{textAlign: "left",letterSpacing: "1px"}}>
                {e.name}<br></br><span className="mt-2" style={{color:"green"}}><StarOutlinedIcon/><StarOutlinedIcon/><StarOutlinedIcon/><StarOutlinedIcon/><StarHalfOutlinedIcon/></span>
              </p>
              <hr className="" style={{marginTop: "90px"}}></hr>
              <div className="float-left ml-3 mt-2 fw-bold" style={{fontSize:"15px"}}>&#x20b9;{e.price}</div>
              <button
                className="product-button btn shadow-none mb-1 float-right"
                style={{height:"70px",width:"70px",marginTop:"-16px",borderRadius:"0px"}}
                onClick={() => {
                  let print = context.cart.findIndex((c) => c.name === e.name);
                  if (print === -1) {
                    e["q"] = 1;
                    context.cart.push(e);
                    context.setCartValue(context.cart.length);
                  } else {
                    context.cart[print]["q"] += 1;
                  }
                }}
              >
                <AddIcon/>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Allinone;
