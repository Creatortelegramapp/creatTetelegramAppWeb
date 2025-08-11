import { createContext, useContext, useState, useEffect } from "react";
import { getProductById } from "../Services/HttpServices/ProductsHttpService.js";
import debounce from "lodash/debounce";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartIds, setCartIds] = useState(() => {
        const storedIds = localStorage.getItem("cart");
        return storedIds ? JSON.parse(storedIds) : [];
    });

    const [cartQuantities, setCartQuantities] = useState(() => {
        const storedQuantities = localStorage.getItem("cart_quantities");
        return storedQuantities ? JSON.parse(storedQuantities) : [];
    });

    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const saveCartToLocalStorage = (ids, quantities) => {
        localStorage.setItem("cart", JSON.stringify(ids));
        localStorage.setItem("cart_quantities", JSON.stringify(quantities));
    };

    useEffect(() => {
        if (!cartIds.length) {
            setCartProducts([]);
            return;
        }

        (async () => {
            const products = await Promise.all(cartIds.map((id) => getProductById(id)));
            const merged = products.map((product, index) => ({
                ...product,
                quantity: cartQuantities[index] || 1,
            }));
            setCartProducts(merged);
        })();
    }, [cartIds, cartQuantities]);

    useEffect(() => {
        const totalPrice = cartProducts.reduce(
            (acc, product) => acc + product.quantity * product.price,
            0
        );
        setTotal(totalPrice);
    }, [cartProducts]);

    const addProductById = async (productId, quantity = 1) => {
        if (cartIds.includes(productId)) return;

        const product = await getProductById(productId);
        const updatedIds = [...cartIds, productId];
        const updatedQuantities = [...cartQuantities, quantity];

        setCartIds(updatedIds);
        setCartQuantities(updatedQuantities);
        saveCartToLocalStorage(updatedIds, updatedQuantities);

        setCartProducts((prev) => [...prev, { ...product, quantity }]);
    };

    const removeProductById = debounce((productId) => {
        const index = cartIds.indexOf(productId);
        if (index === -1) return;

        const newIds = [...cartIds];
        const newQuantities = [...cartQuantities];
        newIds.splice(index, 1);
        newQuantities.splice(index, 1);

        setCartIds(newIds);
        setCartQuantities(newQuantities);
        saveCartToLocalStorage(newIds, newQuantities);

        setCartProducts((prev) => prev.filter((p) => p.id !== productId));
    }, 300);

    const clearCart = () => {
        setCartIds([]);
        setCartQuantities([]);
        setCartProducts([]);
        saveCartToLocalStorage([], []);
    };

    const quantityChange = (productId, amount) => {
        const index = cartIds.indexOf(productId);
        if (index === -1) return;

        const newQuantities = [...cartQuantities];
        const newValue = Math.max(1, newQuantities[index] + (amount > 0 ? 1 : -1));
        newQuantities[index] = newValue;

        setCartQuantities(newQuantities);
        saveCartToLocalStorage(cartIds, newQuantities);

        setCartProducts((prev) =>
            prev.map((product, idx) =>
                idx === index ? { ...product, quantity: newValue } : product
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
