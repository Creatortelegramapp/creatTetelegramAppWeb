
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
        localStorage.setItem("access_token", JSON.stringify(response.data.data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(response.data.data.refresh_token));
        return response.data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};


export const getUserDate = async (token) => {
    try {
        const response = await httpClient.get(`/user`  ,  {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
export const updateUserDate = async (token,updatedData,) => {
    try {
        const response = await httpClient.put(`/user`, updatedData,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}