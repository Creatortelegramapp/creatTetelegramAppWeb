import { useRef, useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import { getUserDate, registerUser, updateUserDate } from "../../../../Services/HttpServices/UserHttpServices.js";
import defaultProfileImg from "/assets/images/edit-profileimg.jpg";

export default function ProfileTab() {
  const [profileImg, setProfileImg] = useState(null);
  const profileImgInput = useRef(null);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (token) {
        try {
          const data = await getUserDate(token);
          if (data) {
            setUserData((prevData) => ({
              ...prevData,
              firstname: data.data.first_name || "",
              lastname: data.data.last_name || "",
              email: data.data.email || "",
              phone: data.data.phone || "",
            }));
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
      if (!token) {
        console.error("Token-ը բացակայում է");
        return;
      }
      const updatedData = {
        first_name: userData.firstname,
        last_name: userData.lastname,
        email: userData.email,
        phone: userData.phone,
      };

      const response = await updateUserDate(token, updatedData);
      console.log(response);

      setUserData((prevData) => ({
        ...prevData,
        firstname: response.first_name || prevData.firstname,
        lastname: response.last_name || prevData.lastname,
        email: response.email || prevData.email,
        phone: response.phone || prevData.phone,
      }));
    } catch (error) {
      console.error("Թարմացման սխալ:", error.message);
    }
  };

  const browseProfileImg = () => {
    profileImgInput.current.click();
  };

  const profileImgChangeHandler = (e) => {
    if (e.target.files.length > 0) {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setProfileImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          setUserData((prevData) => ({
            ...prevData,
            firstname: data.data.first_name || "",
            lastname: data.data.last_name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            password: "",
          }));
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
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
                    label="Ազգանուն*"
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
                    label="Էլ․ հասցե*"
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
                    label="Հեռախոսահամար*"
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
                        label="Գաղտնաբառ*"
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
          </div>
          <div className="flex-1">
            <div className="update-logo w-full mb-9">
              <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                Թարմացնել անձնական էջը
              </h1>
              <p className="text-sm text-qgraytwo mb-5">
                Անձ․ էջի առնվազն չափ
                <span className="ml-1 text-qblack">300x300</span>. Գիֆերը նույնպես աշխատում են.
                <span className="ml-1 text-qblack">Max 5mb</span>.
              </p>
              <div className="flex xl:justify-center justify-start">
                <div className="relative">
                  <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                    <img
                        src={profileImg || defaultProfileImg}
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                  </div>
                  <input
                      ref={profileImgInput}
                      onChange={profileImgChangeHandler}
                      type="file"
                      className="hidden"
                  />
                  <div
                      onClick={browseProfileImg}
                      className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px] bg-qblack rounded-full cursor-pointer"
                  >
                    📷
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="action-area flex space-x-4 items-center">
          <button type="button" className="text-sm text-qred font-semibold">
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