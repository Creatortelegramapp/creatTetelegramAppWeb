import { Link } from "react-router-dom";
import { getTopProductById } from "../../Services/HttpServices/TopProductsHttpService.js";
import { useEffect, useState } from "react";

export default function Banner({ className }) {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getTopProductById().then((response) => {
      if (response?.data?.data) {
        setTopProducts(response.data.data);
      }
    });
  }, []);

  return (
      <>
        <div className={`w-full ${className || ""}`}>
          <div className="container-x mx-auto">
              <div className="main-wrapper w-full">
                  {!!topProducts.length && (
                      <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px] mb-[30px]">
                          <div data-aos="fade-right" className="xl:w-[740px] w-full h-full">
                              <Link to={`/single-product/${topProducts[0].product_id}`}>
                                  <picture>
                                      <source
                                          media="(min-width:1025px)"
                                          srcSet={topProducts[0].image_url}
                                      />
                                      <img
                                          src={topProducts[0].image_url}
                                          alt=""
                                          className="w-full max-w-full h-full object-cover"
                                      />
                                  </picture>
                              </Link>
                          </div>
                          <div data-aos="fade-left" className="flex-1 flex flex-col xl:space-y-[30px] h-full">
                              <div className="hidden xl:block w-full xl:h-1/2">
                                  <Link to={`/single-product/${topProducts[1]?.product_id}`}>
                                      <img
                                          src={topProducts[1]?.image_url}
                                          alt=""
                                          className="w-full h-full object-cover"
                                      />
                                  </Link>
                              </div>
                              <div className="hidden xl:block w-full xl:h-1/2">
                                  <Link to={`/single-product/${topProducts[2]?.product_id}`}>
                                      <img
                                          src={topProducts[2]?.image_url}
                                          alt=""
                                          className="w-full h-full object-cover"
                                      />
                                  </Link>
                              </div>
                              <div className="block xl:hidden flex gap-2 mt-2">
                                  <div className="w-1/2">
                                      <Link to={`/single-product/${topProducts[1]?.product_id}`}>
                                          <img
                                              src={topProducts[1]?.image_url}
                                              alt=""
                                              className="w-full h-auto object-cover"
                                          />
                                      </Link>
                                  </div>
                                  <div className="w-1/2">
                                      <Link to={`/single-product/${topProducts[2]?.product_id}`}>
                                          <img
                                              src={topProducts[2]?.image_url}
                                              alt=""
                                              className="w-full h-auto object-cover"
                                          />
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  <div
                      className="w-full h-[250px] bg-fixed bg-cover bg-no-repeat best-services bg-white flex flex-col lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] lg:py-0 py-10 relative"
                      style={{
                          backgroundImage: 'url("/assets/images/bgImg.png")',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '100%',
                          height: '250px',
                      }}
                  >
                      <div className="flex flex-wrap justify-center items-center w-full">
                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left mb-4">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Անվճար առաքում</p>
                                  <p className="text-sm text-qblue-white"> $100-ից ավել պատվիրելիս </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Անվճար վերադարձ</p>
                                  <p className="text-sm text-qblue-white"> Ստացեք վերադարձ 30 օրվա ընթացքում </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Ապահով վճարում</p>
                                  <p className="text-sm text-qblue-white"> 100% անվտանգ առցանց վճարում </p>
                              </div>
                          </div>

                          <div
                              className="flex flex-col sm:flex-row sm:w-1/2 lg:w-1/4 justify-center items-center text-center sm:text-left">
                              <div>
                                  <p className="text-white text-[15px] font-700 tracking-wide">Լավագույն որակ</p>
                                  <p className="text-sm text-qblue-white"> Օրիգինալ ապրանքի երաշխիք </p>
                              </div>
                          </div>
                      </div>
                  </div>


              </div>
          </div>
        </div>
      </>
  )
      ;
}
