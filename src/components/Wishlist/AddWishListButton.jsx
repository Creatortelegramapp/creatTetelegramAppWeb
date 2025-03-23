import {useEffect, useState} from "react";

export default function AddWishListButton({productId}) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlistItems =  JSON.parse(localStorage.getItem("wishlist"));
    setIsInWishlist(wishlistItems?.includes(productId));

    const updateIsInWishlist = () => {
      const wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
      return setIsInWishlist(wishlistItems?.includes(productId))
    }

    window.addEventListener("wishlist-updated", updateIsInWishlist);

    return () =>
      window.removeEventListener("wishlist-updated", updateIsInWishlist);
  }, [productId]);


  const toggleWishlist = (e) => {
    e.preventDefault();
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];


    wishlistItems = isInWishlist
      ? wishlistItems.filter((id) => id !== productId)
      : [...wishlistItems, productId];

    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <button
      onClick={(e) => toggleWishlist(e)}
      className="appearance-none bg-transparent border-none p-0 m-0"
    >
      <div
        className={`w-10 h-10 flex justify-center items-center rounded cursor-pointer ${
          isInWishlist ? "bg-purple-200 text-white" : "bg-white"
        }`}
      >
        {isInWishlist ? "❤️" : "🤍"}
      </div>
    </button>
  );
}