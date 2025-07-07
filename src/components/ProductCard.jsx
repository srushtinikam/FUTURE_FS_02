import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition w-full max-w-xs mx-auto mb-6 flex flex-col"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md mb-3"
        loading="lazy"
      />

      {/* Product Info */}
      <h3 className="text-lg font-bold text-purple-700 mb-1">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
      <p className="text-lg font-bold text-gray-800 mb-3">₹{product.price}</p>

      {/* Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() => addToWishlist(product)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition"
        >
          ❤️ Add to Wishlist
        </button>

        <Link
          to={`/product/${product.id}`}
          className="block text-center w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
