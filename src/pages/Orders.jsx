import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-600">
                Order Date: {order.createdAt?.toDate().toLocaleString()}
              </p>
              <p>Total: ₹{order.total}</p>
              <ul className="mt-2 list-disc list-inside">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
