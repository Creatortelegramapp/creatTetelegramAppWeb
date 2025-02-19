import {useState, useEffect} from "react";

export default function AddWishListButton({productId}) {
    const WISHLIST_KEY = "wishlist";
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem(WISHLIST_KEY);
        try {
            setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
        } catch (error) {
            console.error("Wishlist parse error:", error);
            setWishlist([]);
        }

        const handleStorageChange = (event) => {
            if (event.key === WISHLIST_KEY) {
                setWishlist(event.newValue ? JSON.parse(event.newValue) : []);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const isInWishlist = wishlist.includes(productId);

    const toggleWishlist = () => {
        let newWishlist = isInWishlist
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];

        localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
        setWishlist(newWishlist);

        // Հաղորդում ենք ամբողջ application-ին, որ wishlist-ը փոխվել է
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <button
            onClick={() => toggleWishlist(productId)}
            className="appearance-none bg-transparent border-none p-0 m-0"
            style={{outline: "none", boxShadow: "none"}} // Լրացուցիչ reset
        >
            <div className={`w-10 h-10 flex justify-center items-center rounded cursor-pointer 
                ${isInWishlist ? "bg-red-500 text-white" : "bg-gray-300"}`}>
                {isInWishlist ? "❤️" : "🤍"}
            </div>
        </button>
    );
}