export default function RemoveButton({ productId, onRemove }) {
    const handleRemove = () => {
        let likedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];
        let updatedProducts = likedProducts.filter(id => id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updatedProducts));
        window.dispatchEvent(new Event("wishlist-updated"));
        if (onRemove) {
            onRemove(productId);
        }
    };

    return (
        <button
            onClick={handleRemove}
            aria-label="Remove item"
            className="p-2 hover:bg-gray-200 rounded transition"
        >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                    fill="#AAAAAA"
                    className="hover:fill-red-500 transition"
                />
            </svg>
        </button>
    );
}
