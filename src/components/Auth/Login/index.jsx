import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../../Services/HttpServices/UserHttpServices.js";

export default function Login() {
  const [checked, setValue] = useState(false);
  const navigate = useNavigate();
  const rememberMe = () => {
    setValue(!checked);
  };
  const [emailError, setEmailError] = useState("")
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError("");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await loginUser(userData);
      if (response.data.access_token) {
        loginUser("aaaa");
        navigate("/profile");
      }
      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setEmailError("Սխալ մեյլ կամ գաղտնաբառ");
      } else {
        setEmailError("Ինչ-որ սխալ տեղի ունեցավ");
      }
      console.log("Error:", error.message);
    }
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Log In
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="example@quomodosoft.com"
                      label="Email Address*"
                      value={userData.email}
                      inputHandler={inputHandler}
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="● ● ● ● ● ●"
                      label="Password*"
                      name="password"
                      type="password"
                      value={userData.password}
                      inputHandler={inputHandler}
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="forgot-password-area flex justify-between items-center mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button
                        onClick={rememberMe}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={rememberMe}
                        className="text-base text-black"
                      >
                        Remember Me
                      </span>
                    </div>
                  </div>
                  <div className="signin-area mb-3.5">
                    <div className="flex justify-center">

                      <button
                        onClick={handleRegister}
                        type="button"
                        className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>Log In</span>
                      </button>
                    </div>
                  </div>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Dont’t have an aceount ?
                      <Link to="/profile" className="ml-2 text-qblack">
                        Sign up free
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
