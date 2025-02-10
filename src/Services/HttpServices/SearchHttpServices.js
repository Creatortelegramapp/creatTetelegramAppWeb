import {httpClient} from "../HttpClientService.js";

export const searchBox = async (productName) => {
    try {
        return await httpClient.get(`product/search/${productName}`);
    } catch (error) {
        console.error('Error fetching product:', error);    }
}