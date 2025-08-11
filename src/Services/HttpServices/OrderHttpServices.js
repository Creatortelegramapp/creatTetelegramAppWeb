import {httpClient} from "../HttpClientService.js";

export const createOrder = async (orderData) => {
    try {
        console.log("Order data to send:", orderData)
        const token = localStorage.getItem("access_token");
        const response = await httpClient.post("/order", orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.status, error.response?.data);
        throw error;
    }
};
