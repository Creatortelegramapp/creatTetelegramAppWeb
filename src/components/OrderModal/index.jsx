import { useState } from "react";
import axios from "axios";

export default function OrderModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        address: "",
        deliveryTime: "",
        ordererPhone: "",
        receiverPhone: "",
        comment: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.address || !formData.deliveryTime || !formData.ordererPhone || !formData.receiverPhone) {
            setError("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը։");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/orders", formData);
            alert("Պատվերը հաջողությամբ ուղարկվեց!");
            onClose();
        } catch (error) {
            console.error("Error sending order", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">Պատվերի տվյալներ</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="text"
                    name="address"
                    placeholder="Առաքման հասցե *"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-3"
                />

                <input
                    type="datetime-local"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-3"
                />

                <input
                    type="tel"
                    name="ordererPhone"
                    placeholder="Պատվիրողի հեռախոսահամար *"
                    value={formData.ordererPhone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-3"
                />

                <input
                    type="tel"
                    name="receiverPhone"
                    placeholder="Ստացողի հեռախոսահամար *"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-3"
                />

                <textarea
                    name="comment"
                    placeholder="Լրացուցիչ մեկնաբանություն (ոչ պարտադիր)"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-3 border rounded mb-4 h-32"
                ></textarea>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
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
