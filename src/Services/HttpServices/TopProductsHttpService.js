import {httpClient} from "../HttpClientService.js";
import { environment } from "../../environment.dev.js";


export const getTopProductById = async() => {
    try {
        const response = await httpClient.get(`product/top-product/${environment.appId}`);
        console.log(response.data)
        return response;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

