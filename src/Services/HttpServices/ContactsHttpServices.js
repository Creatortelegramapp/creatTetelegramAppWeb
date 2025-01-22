import {httpClient} from "../HttpClientService.js";


export const getContacts = async (app_id) => {
    try {
        return await httpClient.get(`/app/get/${app_id}`);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}