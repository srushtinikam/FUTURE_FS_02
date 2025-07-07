import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="px-3 bg-purple-600 text-white rounded hover:bg-purple-700"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-3 bg-purple-600 text-white rounded hover:bg-purple-700"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white p-4 rounded shadow space-y-2">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Tax (10%): ₹{tax.toFixed(2)}</p>
            <p className="font-bold">Total: ₹{total.toFixed(2)}</p>

            <Link
              to="/checkout"
              className="block text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
