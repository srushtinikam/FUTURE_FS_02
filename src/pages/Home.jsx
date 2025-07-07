import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCol);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  //  Fixed: Define filteredProducts BEFORE return
  const filteredProducts = products
  .filter(product =>
    (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  )
  .sort((a, b) => {
    if (sortOrder === 'low') return a.price - b.price;
    if (sortOrder === 'high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
        🛍️ Explore Our Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h3 className="text-lg font-bold text-purple-700 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Category: {product.category}</p>
              <p className="font-semibold text-purple-800 mb-4">₹{product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className="bg-pink-500 text-white py-2 mt-2 rounded-lg hover:bg-pink-600 transition"
              >
                ❤️ Add to Wishlist
              </button>

              <Link
                to={`/product/${product.id}`}
                className="block text-center mt-2 text-purple-600 border border-purple-600 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
