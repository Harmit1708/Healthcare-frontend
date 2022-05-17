import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Allinone from "./Components/Allinone";
import Signin from "./Components/SignIn";
import Signup from "./Components/SignUp";
import Confirmorder from './Components/ConfirmOrder'
import Payment from './Components/Payment'
export const healthCareContext = React.createContext();

const url = "https://mocki.io/v1/e974ca93-7784-4d33-a0c4-f19706e8c6dc";

function App() {
  let [data, setData] = useState([]);
  let [cart, setCart] = useState([]);
  let [cartValue, setCartValue] = useState([cart.length]);

  let [cartPrice,setCartPrice] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let res = await axios.get(url);
    setData(res.data);
  };

  return (
    <>
      <BrowserRouter>
        <healthCareContext.Provider
          value={{ data, cart, setCart, cartValue, cartPrice,setCartPrice,setCartValue }}
        >
          <Routes>
            <Route path="/" element={<Signin />} />
             <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/confirmorder" element={<Confirmorder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />}/>
            <Route path="/covidessentials" element={<Allinone />} />
            <Route path="/healthcaredevices" element={<Allinone />} />
            <Route path="/healthfoodanddrinks" element={<Allinone />} />
            <Route path="/personalcare" element={<Allinone />} />
            <Route path="/ayrvediccare" element={<Allinone />} />
            <Route path="/mother&babycare" element={<Allinone />} />
            <Route path="/skincare" element={<Allinone />} />
            <Route path="/homecare" element={<Allinone />} />
          </Routes>
        </healthCareContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
