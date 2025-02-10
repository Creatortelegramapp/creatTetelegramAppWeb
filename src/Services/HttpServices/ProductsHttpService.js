import {httpClient} from "../HttpClientService.js";

export const getProductById = async (productId) => {
    try {
        const response = await httpClient.get(`/product/${productId}`);
        console.log("API Response:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
