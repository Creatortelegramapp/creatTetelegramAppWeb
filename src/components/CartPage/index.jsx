import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import OrderModal from "../OrderModal";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import CartProductsTable from "./CartProductsTable.jsx";
import {useCartProducts} from "../../hooks/useCartProducts.jsx";
import {useState} from "react";
export default function CardPage({ cart = true }) {
  const { total } = useCartProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  let type = 3

  const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const hasItemsInCart =getCartItems().length > 0;


  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <CartProductsTable className="mb-[30px]" isCart={true} />
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">

                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total
                      </p>
                      <p className="text-[18px] font-medium text-qred">${total}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[50px]">
                <div className="w-full h-[50px]">
                  {hasItemsInCart && (
                  <div className={type === 3 ? "blue-btn" : "yellow-btn"}>
                    <button onClick={() => setIsModalOpen(true)}>Պատվիրել</button>
                    <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                  </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
