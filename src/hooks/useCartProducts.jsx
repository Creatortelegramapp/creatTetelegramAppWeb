import { createContext, useContext, useState, useEffect } from "react";
import { getProductById } from "../Services/HttpServices/ProductsHttpService.js";
import debounce from "lodash/debounce";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartIds, setCartIds] = useState(() => {
        const storedIds = localStorage.getItem("cart");
        return storedIds ? JSON.parse(storedIds) : [];
    });

    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!cartIds.length) {
            setCartProducts([]);
            return;
        }

        (async () => {
            let products = await Promise.all(cartIds.map((id) => getProductById(id)));
            products = products.map((product) => ({
                ...product,
                quantity: cartProducts.find((p) => p.id === product.id)?.quantity || 1,
            }));
            setCartProducts(products);
        })();
    }, [cartIds]);

    useEffect(() => {
        setTotal(cartProducts.reduce((acc, product) => acc + product.quantity * product.price, 0));
    }, [cartProducts]);

    const addProductById = async (productId, quantity = 1) => {
        if (cartIds.includes(productId)) return;

        const product = await getProductById(productId);

        setCartIds((prevIds) => {
            const updatedIds = [...prevIds, productId];
            localStorage.setItem("cart", JSON.stringify(updatedIds));
            return updatedIds;
        });

        setCartProducts((prevProds) => [...prevProds, { ...product, quantity }]);
    };

    const removeProductById = debounce((productId) => {
        setCartIds((prevIds) => {
            const updatedIds = prevIds.filter((id) => id !== productId);
            localStorage.setItem("cart", JSON.stringify(updatedIds));
            return updatedIds;
        });

        setCartProducts((prevProds) => prevProds.filter((p) => p.id !== productId));
    }, 500);

    const clearCart = () => {
        setCartIds([]);
        setCartProducts([]);
        localStorage.setItem("cart", JSON.stringify([]));
    };

    const quantityChange = (productId, amount) => {
        setCartProducts((prev) =>
            prev.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        quantity: amount > 0 ? product.quantity + 1 : Math.max(1, product.quantity - 1),
                    }
                    : product
            )
        );
    };

    const value = {
        cartIds,
        cartProducts,
        addProductById,
        removeProductById,
        clearCart,
        quantityChange,
        total,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartProducts() {
    return useContext(CartContext);
}