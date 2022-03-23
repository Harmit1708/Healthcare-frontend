import React,{ useContext, useState} from "react";
import {healthCareContext} from '../App'
import Logo from '../Assets/shopping-bags.png'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function Razorpay() {

    const [name, setName] = useState('Harmit')

    let context = useContext(healthCareContext)
    let priceValue  = context?.cartPrice


  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    const data = await fetch('https://healthcare-products.herokuapp.com/users/razorpay', { method: 'POST' }).then((t) =>
        t.json()
    )

    console.log(data)

    const options = {
        key: __DEV__ ? 'rzp_test_kd9ipGkYQ7l7tY' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: 'Shopping',
        description: 'Thank you for Shopping.',
        image: {Logo},
        handler: function (response) {
            alert("PaymentID : "+response.razorpay_payment_id)
            alert("OrderID : "+response.razorpay_order_id)
            alert("Razorpay Signature : "+response.razorpay_signature)
            context.setCart([])
            context.setCartValue(0)
        },
        prefill: {
            name
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}


  function loadRazorpay(){
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'

      document.body.appendChild(script)

      script.onload = displayRazorpay
  }

  return (
    <div>
      <button
        className="btn shadow-none"
        onClick={displayRazorpay}
        style={{
          maxWidth: "100%",
          letterSpacing: "2px",
          height: "40px",
          width: "240px",
          color: "white",
          backgroundColor: "black",
        }}
      >
        Buy With Razorpay
      </button>
    </div>
  );
}

export default Razorpay;
