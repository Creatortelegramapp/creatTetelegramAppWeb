import { useEffect, useState } from "react";

export default function AddWishListButton({ productId, wishlist, updateWishlist }) {
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        setIsInWishlist(wishlist.includes(productId));
    }, [wishlist, productId]);

    const toggleWishlist = (e) => {
        e.preventDefault();
        const newWishlist = isInWishlist
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId];

        setIsInWishlist(!isInWishlist);
        updateWishlist(newWishlist);
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