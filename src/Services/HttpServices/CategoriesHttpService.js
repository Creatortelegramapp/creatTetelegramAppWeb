import {httpClient} from "../HttpClientService.js";
import {environment} from "../../environment.dev.js";

export const getCategoryById = async () => {
    try {
        return await httpClient.get(`/category/${environment.appId}`).then((response) => response.data.data);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const getProductByCategoryId  = async () => {
    try {
        return await httpClient.get(`/category/product/${environment.appId}`)
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const getProductByCategory  = async () => {
    try {
         return await httpClient.get(`/product/category/${environment.appId}`)
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

