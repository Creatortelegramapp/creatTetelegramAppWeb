import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import datas from "../../../data/products.json";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";
import IcoCart from "./icons/IcoCart";
import IcoLogout from "./icons/IcoLogout";
import IcoPeople from "./icons/IcoPeople";
import IcoSupport from "./icons/IcoSupport";
import AddressesTab from "./tabs/AddressesTab";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import ReviewTab from "./tabs/ReviewTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";

export default function Profile() {
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("profile");
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    setActive(
        getHashContent && getHashContent.length > 1
            ? getHashContent[1]
            : "profile"
    );
  }, [getHashContent]);

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("access_token");
      if (currentToken !== token) {
        setToken(currentToken);
      }
    };

    const interval = setInterval(checkToken, 500);
    window.addEventListener("storage", checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null); // Անմիջապես թարմացնում է state-ը
  };

  return (
      <Layout childrenClasses="pt-0 pb-0">
        <div className="profile-page-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full my-10">
              <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "profile", path: "/profile" },
                  ]}
              />
              <div className="w-full bg-white px-10 py-9">
                <div className="profile-wrapper w-full mt-8 flex space-x-10">
                  {token ? (
                      <>
                        <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                          <div className="flex flex-col space-y-10">
                            <div className="item group">
                              <Link to="/profile#profile">
                                <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span>
                                <IcoPeople />
                              </span>
                                  <span className="font-normal text-base">
                                Անձնական տեղեկատվություն
                              </span>
                                </div>
                              </Link>
                            </div>
                            <div className="item group">
                              <Link to="/profile#order">
                                <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span>
                                <IcoCart />
                              </span>
                                  <span className="font-normal text-base">Պատվեր</span>
                                </div>
                              </Link>
                            </div>
                            <div className="item group">
                              <Link to="/profile#support">
                                <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span>
                                <IcoSupport />
                              </span>
                                  <span className="font-normal text-base">
                                Աջակցության տոմս
                              </span>
                                </div>
                              </Link>
                            </div>
                            <button className="item group" onClick={handleLogout}>
                              <Link to="/login">
                                <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                              <span>
                                <IcoLogout />
                              </span>
                                  <span className="font-normal text-base">
                                Դուրս գալ
                              </span>
                                </div>
                              </Link>
                            </button>
                          </div>
                        </div>
                      </>
                  ) : (
                      <></>
                  )}

                  <div className="flex-1">
                    <div className="item-body dashboard-wrapper w-full">
                      {active === "profile" ? (
                          <ProfileTab />
                      ) : active === "payment" ? (
                          <Payment />
                      ) : active === "order" ? (
                          <OrderTab />
                      ) : active === "wishlist" ? (
                          <WishlistTab />
                      ) : active === "address" ? (
                          <AddressesTab />
                      ) : active === "password" ? (
                          <PasswordTab />
                      ) : active === "support" ? (
                          <SupportTab />
                      ) : active === "review" ? (
                          <ReviewTab products={datas.products} />
                      ) : (
                          ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}