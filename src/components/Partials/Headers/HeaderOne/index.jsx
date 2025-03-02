import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";

export default function HeaderOne({ className, type = 1 }) {
  return (
      <header className={` ${className || ""} header-section-wrapper relative`}>
        <Middlebar
            type={type}
            className="quomodo-shop-middle-bar lg:block hidden"
        />
        <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
          <div className="w-full h-full flex justify-center items-center px-5">
            <div className="flex justify-center items-center">
              {type === 3 ? (
                  <Link to="/">
                    <img
                        width="152"
                        height="36"
                        src={`${
                            import.meta.env.VITE_PUBLIC_URL
                        }/assets/images/logo-3.svg`}
                        alt="logo"
                    />
                  </Link>
              ) : type === 4 ? (
                  <Link to="/">
                    <img
                        width="152"
                        height="36"
                        src={`${
                            import.meta.env.VITE_PUBLIC_URL
                        }/assets/images/logo-4.svg`}
                        alt="logo"
                    />
                  </Link>
              ) : (
                  <Link to="/">
                    <img
                        width="152"
                        height="36"
                        src={`${
                            import.meta.env.VITE_PUBLIC_URL
                        }/assets/images/logo.svg`}
                        alt="logo"
                    />
                  </Link>
              )}
            </div>
            <div className="hidden lg:block cart relative cursor-pointer">
              <Link to="/cart">
              <span>
                <ThinBag />
              </span>
              </Link>
              <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow text-qblack"
                  }`}
              >
              15
            </span>
            </div>
          </div>
        </div>
        <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
      </header>
  );
}
