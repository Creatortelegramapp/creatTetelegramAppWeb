import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import {getProductById} from "../Services/HttpServices/ProductsHttpService.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartIds, setCartIds] = useState(() => {
        const storedIds = localStorage.getItem('cart');
        return storedIds ? JSON.parse(storedIds) : [];
    });

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (!cartIds.length) {
            setCartProducts([]);
            return;
        }

        (async () => {
            const products = await Promise.all(
                cartIds.map((id) => getProductById(id))
            );
            setCartProducts(products);
        })();
    }, [cartIds]);

    const addProductById = async (productId) => {
        if (cartIds.includes(productId)) return;

        const product = await getProductById(productId);

        setCartIds((prevIds) => {
            const updatedIds = [...prevIds, productId];
            localStorage.setItem('cart', JSON.stringify(updatedIds));
            return updatedIds;
        });

        setCartProducts((prevProds) => [...prevProds, product]);
    };

    const removeProductById = (productId) => {
        setCartIds((prevIds) => {
            const updatedIds = prevIds.filter((id) => id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedIds));
            return updatedIds;
        });

        setCartProducts((prevProds) =>
            prevProds.filter((p) => p.id !== productId)
        );
    };

    const clearCart = () => {
        setCartIds([]);
        setCartProducts([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    const value = {
        cartIds,
        cartProducts,
        addProductById,
        removeProductById,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartProducts() {
    return useContext(CartContext);
}
