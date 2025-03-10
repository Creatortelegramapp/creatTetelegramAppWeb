
import {httpClient} from "../HttpClientService.js";
export const registerUser = async (userData) => {
    try {
        const response = await httpClient.post("/user/register", userData);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};

