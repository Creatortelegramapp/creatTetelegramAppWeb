import axios from 'axios';
const app_id = "1"
const axiosCreate = axios.create({
        baseURL: "http://localhost:8080",
    }
)
export   {axiosCreate,app_id}
