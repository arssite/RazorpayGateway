// src/App.jsx
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const loadRazorpay = (order) => {
    const options = {
      key: "rzp_test_YOUR SAME KEY",
      amount: order.amount,
      currency: order.currency,
      name: "Test Payment",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post("http://localhost:8000/verify-payment/", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          setPaymentStatus(verifyRes.data.status);
        } catch (error) {
          setPaymentStatus("Verification failed.");
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const createOrder = async () => {
    try {
      const res = await axios.post("http://localhost:8000/create-order/", 
        { amount: parseInt(amount) },
        { headers: { "Content-Type": "application/json" } }
      );
      loadRazorpay(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Arssite Template For Razorpay + FastAPI & React vite Integration</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={createOrder} style={{ padding: "10px 20px" }}>
        Pay Now
      </button>

      {paymentStatus && (
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          {paymentStatus}
        </div>
      )}
    </div>
  );
}

export default App;
