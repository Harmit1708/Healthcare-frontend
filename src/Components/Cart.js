import React, { useContext, useState } from "react";
import { healthCareContext } from "../App";
import {  useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Header from '../Components/Header';

function Cart() {
  

  let context = useContext(healthCareContext);

  let token = sessionStorage.getItem('token')

  let navigate = useNavigate()
  let [value, setValue] = useState(context.cart);
  let [anothervalue, anothersetValue] = useState([]);
  let cartPrice = 0;

  console.log(context.cart)

  let handleRemove = (e) => {
    context.cart.splice(context.cart.indexOf(e), 1);
    context.setCartValue(context.cart.length);
  };

  let handleMinus = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    let result = (value[index].q -= 1);
    if (result < 1) {
      alert("Minimum Qty Is 1");
      value[index].q = 1;
    }
    anothersetValue(result);
  };

  let handlePlus = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    let result = (value[index].q += 1);
    anothersetValue(result);
  };


  let checkLoginorNot = () => {
      if(token){
        navigate('/confirmorder')
      }
      else
      {
        navigate('/signin')
      }
  }

  return <div style={{backgroundColor:"#f7f7f7",height: "auto"}}>
    <Header/>
    <div className="container ">
      {context.cart.length > 0 ? (
        <>
          <div className="cart" style={{textAlign:"center"}}>
            {context.cart.map((e, i) => {
              cartPrice = cartPrice + Number(e.price * e.q);
              return (
                <div className="m-5" key={i} style={{height:"450px",width:"300px",backgroundColor:"#ffffff"}}>
                  <img className="cart-image" src={e.image} alt={e.name} style={{height:"250px",width:"300px"}}></img>
                  <p className="text-center d-flex flex-column flex-wrap fw-bold ml-3 mt-3" style={{textAlign: "left",letterSpacing: "1px"}}>{e.name}</p>
                  <div>
                    <button
                      id="minus"
                      className="btn minus-btn shadow-none  m-2 "
                      onClick={() => {
                        handleMinus(e);
                      }}
                    >
                      <RemoveIcon />
                    </button>
                    Qty:{e.q}
                    <button
                      className="btn plus-btn shadow-none  m-2"
                      onClick={() => {
                        handlePlus(e);
                      }}
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <hr className=""></hr>
                  <div  className="float-left ml-3 mt-2 fw-bold" style={{fontSize:"15px"}}>&#x20b9;{e.price}</div>
                  <button
                    className="product-button btn btn shadow-none mb-3 float-right"
                    style={{height:"72px",width:"70px",marginTop:"-16px",borderRadius:"0px"}}
                    onClick={() => {
                      handleRemove(e);
                    }}
                  >
                    <RemoveIcon/>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="Total-pay fw-bold" style={{textAlign: 'center',letterSpacing: "2px"}}>
              <div className="fw-bold">Total Pay : &#x20b9;{cartPrice}</div>
                <button
                  className="btn btn-outline-success m-3"
                  style={{
                    maxWidth: "100%",
                    fontSize: "20px",
                    letterSpacing: "2px",
                    height: "50px",
                    width: "300px",
                    color:"black",
                    backgroundColor: "#f2cb1f",
                  }}
                  onClick={() => {
                    checkLoginorNot()
                  }}
                >
                  Check Out
                </button>
            </div>
        </>
      ) : (
        <>
          <h4 className="lead text-center" style={{letterSpacing: "1px",fontSize: "25px" }}>Cart Is Empty!</h4>
        </>
      )}
    </div>
</div>
}

export default Cart;
