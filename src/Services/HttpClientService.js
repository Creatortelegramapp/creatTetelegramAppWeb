import axios from "axios";
import {environment} from "../environment.dev.js";

export const httpClient  = axios.create({
        baseURL: environment.api,
    }
)