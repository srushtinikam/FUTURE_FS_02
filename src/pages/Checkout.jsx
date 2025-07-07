import { useCart } from "../context/CartContext";
import { useState } from "react";
import { db } from "../firebase";
import emailjs from 'emailjs-com';

import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const finalTotal = subtotal - (subtotal * discount) / 100;

  const handleApplyCoupon = async () => {
    setError("");
    setSuccess("");
    if (!coupon.trim()) {
      setError("Please enter a coupon code.");
      return;
    }

    try {
      const couponRef = doc(db, "coupons", coupon.toUpperCase());
      const couponSnap = await getDoc(couponRef);

      if (couponSnap.exists()) {
        const data = couponSnap.data();
        setDiscount(data.discount);
        setSuccess(`✅ Coupon applied! You saved ${data.discount}%`);
      } else {
        setDiscount(0);
        setError("❌ Invalid coupon code.");
      }
    } catch (err) {
      console.error("Error checking coupon:", err);
      setError("❌ Error checking coupon");
    }
  };

  const sendEmail = (orderId, userEmail) => {
    const templateParams = {
      email: userEmail,
      order_id: orderId,
      orders: cartItems.map(item => `
        <p><strong>${item.name}</strong> - ₹${item.price} (QTY: ${item.units || 1})</p>
      `).join(""),
      cost: {
        shipping: 0,
        tax: 0
      },
      price: finalTotal.toFixed(2)
    };

    emailjs.send(
      'service_n5uuh7q',
      'template_12b3fug',
      templateParams,
      'zzRZbfNTi-A0yrJE4'
    ).then((res) => {
      console.log("✅ Email sent!", res.status);
    }).catch((err) => {
      console.error("❌ Failed to send email:", err);
    });
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cartItems,
        total: finalTotal,
        createdAt: serverTimestamp(),
      });

      sendEmail(orderRef.id, currentUser.email);
      clearCart();
      alert("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.title}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <hr className="my-4" />
        <p className="text-right font-semibold mb-4">Subtotal: ₹{subtotal}</p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Have a coupon?</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="border px-3 py-2 rounded w-full"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-red-600 mt-1">{error}</p>}
          {success && <p className="text-green-600 mt-1">{success}</p>}
        </div>

        <p className="text-right text-xl font-bold mt-4">
          Total: ₹{finalTotal.toFixed(2)}
        </p>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
