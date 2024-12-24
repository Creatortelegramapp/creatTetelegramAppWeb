import {httpClient} from "../HttpClientService.js";

export const getProductById = (categoryId) => {
    try {
        return httpClient.get(`/product/${categoryId}`);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}