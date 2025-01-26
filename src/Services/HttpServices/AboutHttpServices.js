import {httpClient} from "../HttpClientService.js";
import {environment} from "../../environment.dev.js";


export const getAboutPages = async (app_id) => {
    try {
        return await httpClient.get(`/about-pages/${app_id}`);
    } catch (error) {
        console.error('Error fetching about:', error);
    }
}