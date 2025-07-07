import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function OrderHistory() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please login to see your orders.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded bg-white">
            <p className="font-semibold mb-2">Order ID: {order.id}</p>
            <p className="mb-2">Total: ₹{order.total}</p>
            <p className="mb-2 text-sm text-gray-500">Placed on: {order.createdAt?.toDate().toLocaleString()}</p>
            <ul className="list-disc pl-5 text-sm">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.title} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
