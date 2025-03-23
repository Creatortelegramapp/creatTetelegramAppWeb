import { useRef, useState } from "react";
import InputCom from "../../../Helpers/InputCom";
import { registerUser } from "../../../../Services/HttpServices/LoginHttpServices.js";

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
    console.log("name", name);
    console.log("value", value);
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(userData);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
      <>
<span>{userData.firstname}</span>
      <InputCom
          label="Անուն"
          type="text"
          name="fistname"
          value={userData.firstname}
          id="firstname"
          inputHandler={inputHandler}
          placeholder="Անուն"
          inputClasses="h-[50px]"
      />
      </>

      // <>
      //   <div className="flex space-x-8">
      //     <div className="w-[570px]">
      //       <div className="input-item flex space-x-2.5 mb-8">
      //         <div className="w-1/2 h-full">
      //           <InputCom
      //               label="Անուն"
      //               type="text"
      //               name="fistname"
      //               value={userData.firstname}
      //               id="firstname"
      //               inputHandler={inputHandler}
      //               placeholder="Անուն"
      //               inputClasses="h-[50px]"
      //           />
      //         </div>
      //         <div className="w-1/2 h-full">
      //           <InputCom
      //               label="Ազգանուն*"
      //               placeholder="Ազգանուն"
      //               type="text"
      //               name="lastname"
      //               // value={userData.lastname}
      //               inputHandler={inputHandler}
      //               inputClasses="h-[50px]"
      //           />
      //         </div>
      //       </div>
      //       <div className="input-item flex space-x-2.5 mb-8">
      //         <div className="w-1/2 h-full">
      //           <InputCom
      //               label="Էլ․ հասցե*"
      //               placeholder="Էլ․ հասցե"
      //               type="email"
      //               name="email"
      //               // value={userData.email}
      //               inputHandler={inputHandler}
      //               inputClasses="h-[50px]"
      //           />
      //         </div>
      //         <div className="w-1/2 h-full">
      //           <InputCom
      //               label="Հեռախոսահամար*"
      //               placeholder="012 3 *******"
      //               type="text"
      //               name="phone"
      //               // value={userData.phone}
      //               inputHandler={inputHandler}
      //               inputClasses="h-[50px]"
      //           />
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex-1">
      //       <div className="update-logo w-full mb-9">
      //         <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
      //           Թարմացնել անձնական էջը
      //         </h1>
      //         <p className="text-sm text-qgraytwo mb-5">
      //           Անձ․ էջի առնվազն չափ
      //           <span className="ml-1 text-qblack">300x300</span>. Գիֆերը նույնպես աշխատում են.
      //           <span className="ml-1 text-qblack">Max 5mb</span>.
      //         </p>
      //         <div className="flex xl:justify-center justify-start">
      //           <div className="relative">
      //             <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
      //               <img
      //                   src={
      //                       profileImg ||
      //                       `${
      //                           import.meta.env.VITE_PUBLIC_URL
      //                       }/assets/images/edit-profileimg.jpg`
      //                   }
      //                   alt="Profile"
      //                   className="object-cover w-full h-full"
      //               />
      //             </div>
      //             <input
      //                 ref={profileImgInput}
      //                 onChange={profileImgChangeHandler}
      //                 type="file"
      //                 className="hidden"
      //             />
      //             <div
      //                 onClick={browseProfileImg}
      //                 className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px] bg-qblack rounded-full cursor-pointer"
      //             >
      //               📷
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="action-area flex space-x-4 items-center">
      //     <button type="button" className="text-sm text-qred font-semibold">
      //       Չեղարկել
      //     </button>
      //     <button
      //         type="button"
      //         className="w-[164px] h-[50px] bg-qblack text-white text-sm"
      //         onClick={handleRegister}
      //     >
      //       Գրանցվել
      //     </button>
      //   </div>
      // </>
  );
}
