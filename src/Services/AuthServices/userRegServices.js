import {registerUser} from "../HttpServices/UserHttpServices.js";

export  const userRegistration =  (registrationData) =>{
    const response  = registerUser(registrationData);
    if(response.success){
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(response.data.refresh_token));

    }

}
