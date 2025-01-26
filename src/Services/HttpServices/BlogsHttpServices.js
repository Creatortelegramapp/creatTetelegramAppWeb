import {httpClient} from "../HttpClientService.js";


export const getBlogs = async (app_id) => {
    try {
        return await httpClient.get(`/blogs/${app_id}`);
    } catch (error) {
        console.error('Error fetching about:', error);
    }
}