import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ ordererPhone: "" });
    const [error, setError] = useState("");

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

        try {
            await axios.post("http://localhost:8080/api/order", formData);
            alert("Պատվերը հաջողությամբ ուղարկվեց!");
            setFormData({ ordererPhone: "" });
            setError("");
            onClose();
        } catch (error) {
            console.error("Error sending order", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold mb-6 text-black">Պատվերի տվյալներ</h2>
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
                    >
                        Ուղարկել
                    </button>
                </div>
            </div>
        </div>
    );
}
