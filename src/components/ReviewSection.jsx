import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function ReviewSection({ productId }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const reviewsRef = collection(db, 'products', productId, 'reviews');
      await addDoc(reviewsRef, {
        user: currentUser.email,
        rating: Number(rating),
        comment,
        createdAt: serverTimestamp(),
      });
      setRating('');
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, 'products', productId, 'reviews'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews);
    });

    return () => unsubscribe();
  }, [productId]);

  const averageRating =
    reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / (reviews.length || 1);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-3">⭐ Customer Reviews</h3>
      <p className="mb-4">Average Rating: ⭐ {averageRating.toFixed(1)} / 5</p>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        >
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} ⭐
            </option>
          ))}
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your review..."
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit Review
        </button>
      </form>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border p-3 rounded shadow-sm bg-gray-50">
              <p className="font-semibold">{r.user}</p>
              <p>⭐ {r.rating} / 5</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewSection;
