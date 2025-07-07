import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  //  Load wishlist from localStorage (optional)
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  //  Save wishlist to localStorage (optional)
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  //  Add item to wishlist
  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  //  Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  //  Check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
