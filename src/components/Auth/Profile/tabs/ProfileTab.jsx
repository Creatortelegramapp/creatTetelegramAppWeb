import { useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import { handleRegister, handleUpdate, fetchUserData } from "../../../../Services/AuthServices/userRegServices.js";

export default function ProfileTab() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [initialUserData, setInitialUserData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetchUserData((data) => {
      setUserData(data);
      setInitialUserData(data);
    });
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessages([]);
  };

  const handleCancel = () => {
    setUserData(initialUserData);
    setErrorMessages([]);
  };

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
          <button type="button" className="text-sm text-qred font-semibold" onClick={handleCancel}>
            Չեղարկել
          </button>
          {isLoggedIn ? (
              <button
                  type="button"
                  className="w-[164px] h-[50px] bg-qblack text-white text-sm"
                  onClick={() => handleUpdate(userData, setUserData)}
              >
                Փոխել տվյալները
              </button>
          ) : (
              <button
                  type="button"
                  className="w-[164px] h-[50px] bg-qblack text-white text-sm"
                  onClick={() => handleRegister(userData, setUserData, setErrorMessages)}
              >
                Գրանցվել
              </button>
          )}
        </div>
      </>
  );
}
