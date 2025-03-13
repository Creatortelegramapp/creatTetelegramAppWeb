    import { Link } from "react-router-dom";
    import { useCartProducts } from "../../../hooks/useCartProducts.jsx";
    import { useEffect, useState } from "react";
    import AddToCartButton from "../../Cart/AddToCartButton.jsx";
    import AddWishListButton from "../../Wishlist/AddWishListButton.jsx"; // Ներմուծում ենք AddWishListButton-ը

    export default function ProductCardStyleOne({ product }) {
        const { addProductById, removeProductById, cartProducts } = useCartProducts();
        const [isAdded, setIsAdded] = useState(false);

        const [wishlist, setWishlist] = useState(() => {
            const storedWishlist = localStorage.getItem("wishlist") || "[]";
            return JSON.parse(storedWishlist);
        });

        const addProduct = (id) => {
            addProductById(id);
            setIsAdded(true);
        };

        const removeProduct = (id) => {
            removeProductById(id);
            setIsAdded(false);
        };

        const updateWishlist = (newWishlist) => {
            setWishlist(newWishlist);
            try {
                localStorage.setItem("wishlist", JSON.stringify(newWishlist));
                window.dispatchEvent(new Event("storage"));
            } catch (error) {
                console.error("error", error);
            }
        };

        useEffect(() => {
            const isInCart = cartProducts.some((cartProduct) => cartProduct.id === product.id);
            setIsAdded(isInCart);
        }, [cartProducts, product.id]);

        return (
            <div className="product-card-one w-full">
                <div className="product-card w-full h-full bg-white relative group overflow-hidden mb-5 transition-transform transform group-hover:scale-50">
                    <div className="product-card-img max-w-full h-[300px] relative">
                        <img
                            src={product.media_urls[0]}
                            alt={product.name}
                            className="w-full h-[300px] object-cover"
                        />
                        {/* Quick access կոճակներ նկարի վերևի աջ անկյունում */}
                        <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[20px] transition-all duration-300 ease-in-out">
                            <div className="flex justify-center items-center bg-primarygray rounded">
                                <AddWishListButton
                                    productId={product.id}
                                    wishlist={wishlist}
                                    updateWishlist={updateWishlist}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product-card-details px-4 py-4 relative">
                        <div className="absolute w-full h-10 px-4 left-0 top-40 group-hover:top-[50px] transition-all duration-300 ease-in-out">
                            <AddToCartButton
                                productId={product.id}
                                isAdded={isAdded}
                                onAddToCart={addProduct}
                                onRemoveFromCart={removeProduct}
                                className="w-full text-white py-2 rounded-md flex justify-center items-center transition-all"
                            />
                        </div>
                        <Link to={`/single-product/${product.id}`}>
                            <p className="title mb-2 text-[16px] font-semibold text-gray-800 leading-[24px] line-clamp-2 hover:text-blue-600">
                                {product.name}
                            </p>
                        </Link>
                        <div className="price">
                            <div className="main-price font-semibold text-[18px] text-gray-600">
                                <p>{product.price}$</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }