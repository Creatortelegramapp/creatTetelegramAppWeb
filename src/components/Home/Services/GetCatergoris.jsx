
import { axiosCreate, app_id } from "../../../envApi.jsx";
const GetCategories = function () {
    axiosCreate.get(`/api/category/${app_id}`)
        .then((response) => {
            console.log(response.data.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

export default GetCategories()