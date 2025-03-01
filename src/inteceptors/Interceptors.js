export const handlerFor404Error = (httpClient) => {
    httpClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 404) {
                window.location.href = '/not-found';
            }
            return Promise.reject(error);
        }
    );
};

