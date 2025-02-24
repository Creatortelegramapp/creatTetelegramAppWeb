import {httpClient} from "../HttpClientService.js";
import addInterceptors from "../InterceptorService.js";

addInterceptors();

export const getProductById = async (productId) => {
    try {
        return await httpClient.get(`/product/${productId}`);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};


