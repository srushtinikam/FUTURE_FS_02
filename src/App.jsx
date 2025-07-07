import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';  // Added wishlist page
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';  // Added wishlist context
import PrivateRoute from './components/PrivateRoute';
import OrderHistory from './pages/OrderHistory';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      <Route 
      path="/orders"
      element={
      <OrderHistory />
        } 
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <PrivateRoute>
              <Confirmation />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider> {/* Wishlist wrapped here */}
          <div className="w-full max-w-[100%] mx-auto">

            <Navbar />
            <AnimatedRoutes />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
