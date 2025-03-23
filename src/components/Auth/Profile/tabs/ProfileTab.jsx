import { useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import { getUserDate, registerUser, updateUserDate } from "../../../../Services/HttpServices/UserHttpServices.js";

export default function ProfileTab() {

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [initialUserData, setInitialUserData] = useState(null)
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (token) {
        try {
          const data = await getUserDate(token);
          if (data) {
            const fetchedData = {
            firstname: data.data.first_name || "",
            lastname: data.data.last_name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
          };
            setUserData(fetchedData);
            setInitialUserData(fetchedData)
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token"));
      const updatedData = {
        first_name: userData.firstname,
        last_name: userData.lastname,
        email: userData.email,
        phone: userData.phone,
      };

      const response = await updateUserDate(token, updatedData);

      setInitialUserData({
        firstname: response.first_name ,
        lastname: response.last_name ,
        email: response.email ,
        phone: response.phone ,
      });

      setUserData((prevData) => ({
        ...prevData,
        firstname: response.first_name || prevData.firstname,
        lastname: response.last_name || prevData.lastname,
        email: response.email || prevData.email,
        phone: response.phone || prevData.phone,
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessages([]);
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(userData);
      if (response.data.access_token) {
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(response.data.refresh_token));

        const token = response.data.access_token;
        const data = await getUserDate(token);
        if (data) {
          const fetchData = {
            firstname: data.data.first_name || "",
            lastname: data.data.last_name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            password: "",
          };
          setUserData(fetchData);
          setInitialUserData(fetchData);
          setErrorMessages([]);
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendError = error.response.data;
        if (backendError.errors) {
          const allErrors = Object.values(backendError.errors).flat();
          setErrorMessages(allErrors);
        }
        else if (backendError.message) {
          setErrorMessages([backendError.message]);
        }
        else {
          setErrorMessages(["Something went wrong during registration"]);
        }
      } else {
        setErrorMessages([error.message || "Request failed unexpectedly"]);
      }
      console.log("Registration Error:", error.response?.data || error.message);
    }
  };
  const  handleCancel = () =>{
    if(initialUserData){
      setUserData(initialUserData);
    }
  }

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
      <>
        <div className="flex space-x-8">
          <div className="w-[570px]">
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <InputCom
                    label="Անուն"
                    type="text"
                    name="firstname"
                    value={userData.firstname}
                    inputHandler={inputHandler}
                    placeholder="Անուն"
                    inputClasses="h-[50px]"
                />
              </div>
              <div className="w-1/2 h-full">
                <InputCom
                    label="Ազգանուն"
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    inputHandler={inputHandler}
                    placeholder="Ազգանուն"
                    inputClasses="h-[50px]"
                />
              </div>
            </div>
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <InputCom
                    label="Էլ․ հասցե"
                    placeholder="Էլ․ հասցե"
                    type="email"
                    name="email"
                    value={userData.email}
                    inputHandler={inputHandler}
                    inputClasses="h-[50px]"
                />
              </div>
              <div className="w-1/2 h-full">
                <InputCom
                    label="Հեռախոսահամար"
                    placeholder="012 3 *******"
                    type="text"
                    name="phone"
                    value={userData.phone}
                    inputHandler={inputHandler}
                    inputClasses="h-[50px]"
                />
              </div>

              {!isLoggedIn && (
                  <div className="w-1/2 h-full">
                    <InputCom
                        label="Գաղտնաբառ"
                        placeholder="Գաղտնաբառ"
                        type="password"
                        name="password"
                        value={userData.password}
                        inputHandler={inputHandler}
                        inputClasses="h-[50px]"
                    />
                  </div>
              )}
            </div>
            {errorMessages.length > 0 && (
                <div className="text-red-500 text-sm mb-4">
                  {errorMessages.map((error, index) => (
                      <div key={index}>{error}</div>
                  ))}
                </div>
            )}
          </div>
        </div>
        <div className="action-area flex space-x-4 items-center">
          <button type="button" className="text-sm text-qred font-semibold"
            onClick={
              handleCancel
            }
          >
            Չեղարկել
          </button>
          {localStorage.getItem("access_token") ? (
              <button
                  type="button"
                  className="w-[164px] h-[50px] bg-qblack text-white text-sm"
                  onClick={handleUpdate}
              >
                Փոխել տվյալները
              </button>
          ) : (
              <button
                  type="button"
                  className="w-[164px] h-[50px] bg-qblack text-white text-sm"
                  onClick={handleRegister}
              >
                Գրանցվել
              </button>
          )}
        </div>
      </>
  );
}