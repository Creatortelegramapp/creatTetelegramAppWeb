import {httpClient} from "../HttpClientService.js";
import { environment } from "../../environment.dev.js";

export const getCategoryById = async() => {
    try {
        const response = await httpClient.get(`/category/${environment.appId}`);
        console.log(response.data)
        // return httpClient.get(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const getProductById = async() => {
    try {
        const response = await httpClient.get(`/category/product/${environment.appId}`);
        console.log(response.data)
        // return httpClient.get(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}