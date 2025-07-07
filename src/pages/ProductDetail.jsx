import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReviewSection from '../components/ReviewSection';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!product) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/" className="text-purple-600 underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-64 object-contain"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-lg font-semibold mb-4">Price: ₹{product.price}</p>
            <p className="mb-4">{product.description}</p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-6"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <div>
              <Link to="/" className="text-purple-600 hover:underline">
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/*  Review Section */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
}

export default ProductDetail;
