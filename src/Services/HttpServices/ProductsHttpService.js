import {httpClient} from "../HttpClientService.js";

export const getProductById = (productId) => {
    try {
        return httpClient.get(`/product/${productId}`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}