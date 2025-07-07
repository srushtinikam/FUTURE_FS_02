import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Navbar() {
  const { cartItems } = useCart();
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <motion.nav
      className="bg-purple-600 text-white px-4 py-4 flex flex-wrap justify-between items-center shadow-md"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 70 }}
    >
      {/* Left: Logo */}
      <Link
        to="/"
        className="font-bold text-xl flex items-center hover:opacity-90 transition"
      >
        🛍️ <span className="ml-1">Mini Store</span>
      </Link>

      {/* Right: Nav Links */}
      <div className="flex flex-wrap items-center justify-end gap-2 mt-3 sm:mt-0 text-sm">
        {isAdmin && (
          <Link
            to="/admin"
            className="hover:underline text-white transition"
          >
            Admin Panel
          </Link>
        )}

        <Link
          to="/orders"
          className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition"
        >
          My Orders
        </Link>

        <Link
          to="/checkout"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Go to Checkout
        </Link>

        <Link
          to="/wishlist"
          className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition"
        >
          ❤️ Wishlist
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-1 relative bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
          <span>Cart</span>
        </Link>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-700 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
