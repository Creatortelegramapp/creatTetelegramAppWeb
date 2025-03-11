
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


export const loginUser = async (userData) => {
    try {
        const response = await httpClient.post("/user/login", userData);
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};


export const getUserDate = async (user_id) => {
    try {
        return await httpClient.get(`/userData/get/${user_id}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}