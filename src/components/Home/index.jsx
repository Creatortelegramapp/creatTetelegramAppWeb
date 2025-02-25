import datas from "../../data/products.json";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import {Link} from "react-router-dom";
import QuickViewIco from "../Helpers/icons/QuickViewIco.jsx";
import ThinLove from "../Helpers/icons/ThinLove.jsx";
import Compair from "../Helpers/icons/Compair.jsx";
import {useEffect, useState} from "react";
import {getProductByCategoryId} from "../../Services/HttpServices/CategoriesHttpService.js";
import {environment} from "../../environment.dev.js";

export default function Home() {

    const [productData, setProductData] = useState([]);
    const {products} = datas;
    const brands = [];
    products.forEach((product) => {
        brands.push(product.brand);
    });


    useEffect(() => {
        async function productsResponse() {
            const response = await getProductByCategoryId(environment.appId);
            setProductData(response.data.data[0].products);
        }

        productsResponse();
    }, []);

    return (
        <>
            <Layout>
                <div className="btn w-5 h-5 "></div>
                <Banner className="banner-wrapper mb-[60px]"/>
                <SectionStyleOne
                    products={products}
                    brands={brands}
                    categoryTitle="Բջջային և պլանշետ"
                    sectionTitle="Խաղացողի աշխարհ"
                    seeMoreUrl="/all-products"
                    className="category-products mb-[60px]"
                />

                <ProductsAds
                    sectionHeight="sm:h-[295px] h-full"
                    className="products-ads-section mb-[60px]"
                />
                <ViewMoreTitle
                    className="top-selling-product mb-[60px]"
                    seeMoreUrl="/all-products"
                    categoryTitle="Ամենավաճառվող ապրանքներ"
                >

                    <div className="grid grid-cols-2 lg:grid-cols-2 xl:gap-[30px] gap-5">
                        {productData.length && (
                            productData.slice(0, 4).map((data, index) => (
                                <div key={index}
                                     data-aos="fade-left"
                                     className="product-row-card-style-one w-full h-[400px] lg:h-[500px] bg-white group relative overflow-hidden"
                                >
                                    <div
                                        className="flex flex-col sm:flex-row space-x-0 sm:space-x-5 items-center w-full h-full lg:p-[30px] sm:p-3 p-2">
                                        <div className="lg:w-full w-full h-[250px] sm:h-full"
                                             style={{
                                                 backgroundImage: `url(${data.media_urls[0]})`,
                                                 backgroundRepeat: "no-repeat",
                                                 backgroundSize: "cover",
                                                 backgroundPosition: "center center",
                                             }}>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center h-auto sm:h-full">
                                            <div>
                                                <Link to="/single-product">
                                                    <p className="title mb-2 sm:text-[18px] text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                                                        {data.name}
                                                    </p>
                                                </Link>
                                                <p className="price mb-[10px] sm:mb-[26px]">
                                                    <div
                                                        className="main-price text-qgray line-through font-600 sm:text-[22px] text-base">
                                                        {data.price}
                                                    </div>
                                                </p>
                                                <button type="button" className="w-full sm:w-[140px] h-[45px]">
                                                    <div className="yellow-btn text-center">Add To Cart</div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    {/* quick-access-btns */}
                                    <div
                                        className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px] transition-all duration-300 ease-in-out">
                                        <a href="#">
                                            <div
                                                className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                                                <QuickViewIco/>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <div
                                                className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                                                <ThinLove/>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <div
                                                className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                                                <Compair/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ViewMoreTitle>
                <CampaignCountDown
                    className="mb-[60px]"
                    lastDate="2025-10-04 4:00:00"
                />
            </Layout>
        </>
    );
}
