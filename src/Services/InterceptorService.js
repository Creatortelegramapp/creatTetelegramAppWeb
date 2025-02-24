import {httpClient} from './HttpClientService';

const addInterceptors = () => {
    httpClient.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    httpClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 404) {
                window.location.href = '/';
            }
            return Promise.reject(error);
        }
    );
};

export default addInterceptors;
