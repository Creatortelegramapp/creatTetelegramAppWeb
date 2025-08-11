import {httpClient} from "../HttpClientService.js";
import {environment} from "../../../../clothersShop/src/environment.dev.js";


export const getTopProductById = async () => {
  try {
    return await httpClient.get(`product/top-product/${environment.appId}`);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

