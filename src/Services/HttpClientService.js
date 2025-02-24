import axios from "axios";
import {environment} from "../environment.dev.js";
import {handlerFor404Error} from "../inteceptors/Interceptors.js";


export const httpClient = axios.create({
    baseURL: environment.api,
  }
)

handlerFor404Error(httpClient);