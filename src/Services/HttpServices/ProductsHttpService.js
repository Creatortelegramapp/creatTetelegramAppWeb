import {httpClient} from "../HttpClientService.js";

export const getProductById = async (productId) => {
    try {
        return await httpClient.get(`/product/${productId}`).then(res => res.data.data);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};


