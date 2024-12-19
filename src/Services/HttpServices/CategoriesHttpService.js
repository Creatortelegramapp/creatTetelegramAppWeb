import {httpClient} from "../HttpClientService.js";

export const getCategoryById = (categoryId) => {
    try {
        return httpClient.get(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}