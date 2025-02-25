import {httpClient} from "../HttpClientService.js";

export const getProductById = async (productId) => {
    try {
        const response = await httpClient.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
