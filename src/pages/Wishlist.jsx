import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
        ❤️ Your Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-purple-700 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-1">Category: {product.category}</p>
              <p className="text-purple-800 font-semibold mb-4">₹{product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
