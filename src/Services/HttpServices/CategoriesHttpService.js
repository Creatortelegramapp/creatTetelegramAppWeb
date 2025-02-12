import {httpClient} from "../HttpClientService.js";

export const getCategoryById = async (categoryId) => {
    try {
        return await httpClient.get(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const getProductByCategoryId  = async (categoryId) => {
    try {
        return await httpClient.get(`/category/product/${categoryId}`)
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const getProductByCategory  = async (categoryId) => {
    try {
         return await httpClient.get(`/product/category/${categoryId}`)
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

