import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '', //  This is for image URL now
  });
  const [editId, setEditId] = useState(null);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsArray);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) {
      alert('Please fill all required fields!');
      return;
    }

    if (editId) {
      // Update product
      const productRef = doc(db, 'products', editId);
      await updateDoc(productRef, formData);
      setEditId(null);
    } else {
      // Add product
      await addDoc(collection(db, 'products'), formData);
    }

    setFormData({ title: '', price: '', category: '', description: '', image: '' });
    fetchProducts();
  };

  // Delete Product
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  // Edit Product
  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">🛠️ Admin Panel</h2>

      {/*  Add or Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow mb-10">
        <input
          type="text"
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {editId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Products Table */}
      <h3 className="text-xl font-semibold mb-2">All Products</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-2" />
            <h4 className="font-bold">{product.title}</h4>
            <p className="text-sm text-gray-600">₹{product.price}</p>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
