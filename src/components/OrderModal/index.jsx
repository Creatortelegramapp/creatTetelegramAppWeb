import { useState, useEffect } from "react";
import { createOrder } from "../../Services/HttpServices/OrderHttpServices.js";
import { getProductById } from "../../Services/HttpServices/ProductsHttpService.js";

export default function OrderModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ ordererPhone: "" });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("access_token");

    // 🔄 Լցնում ենք ապրանքները համապատասխան քանակներով
    useEffect(() => {
        if (isOpen) {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const storedQuantities = JSON.parse(localStorage.getItem("cart_quantities")) || [];

            if (storedCart.length === 0) {
                setProducts([]);
                return;
            }

            setLoading(true);

            Promise.all(storedCart.map((id) => getProductById(id)))
                .then((productsData) => {
                    const enriched = productsData.map((product, index) => ({
                        ...product,
                        quantity: storedQuantities[index] || 1,
                    }));
                    setProducts(enriched);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error loading products", err);
                    setLoading(false);
                });
        } else {
            setProducts([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setFormData({ ordererPhone: "" });
            setError("");
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!formData.ordererPhone) {
            setError("Խնդրում ենք լրացնել հեռախոսահամարը։");
            return;
        }

        if (!/^\d{9,12}$/.test(formData.ordererPhone)) {
            setError("Խնդրում ենք մուտքագրել վավեր հեռախոսահամար (9-12 թիվ)։");
            return;
        }

        if (!token) {
            setError("Չկա ավտորիզացիոն տոքեն, խնդրում ենք լոգին լինել։");
            return;
        }

        const orderData = {
            app_id: 2,
            product_ids: products.map((p) => p.id),
            product_count: products.map((p) => p.quantity || 1),
            product_info: products.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity || 1,
            })),
            phone_number: formData.ordererPhone,
        };

        try {
            await createOrder(orderData);
            alert("Պատվերը հաջողությամբ ուղարկվեց!");
            setFormData({ ordererPhone: "" });
            setError("");
            onClose();
        } catch (error) {
            console.error("Error sending order", error);
            setError("Պատվերի ուղարկման ընթացքում խնդիր է առաջացել։");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="font-bold mb-6 text-black">Պատվերի տվյալներ</h2>

                {loading && <p>Բեռնում...</p>}

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="tel"
                    name="ordererPhone"
                    placeholder="Հեռախոսահամար *"
                    value={formData.ordererPhone}
                    onChange={handleChange}
                    className="w-full text-black p-3 border rounded mb-3"
                />



                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={() => {
                            setError("");
                            setFormData({ ordererPhone: "" });
                            onClose();
                        }}
                        className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 transition"
                    >
                        Չեղարկել
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        Ուղարկել
                    </button>
                </div>
            </div>
        </div>
    );
}
