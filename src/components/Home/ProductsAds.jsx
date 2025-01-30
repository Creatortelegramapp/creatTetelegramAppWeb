import { Link } from "react-router-dom";

export default function ProductsAds () {


    return (
        <div className={`w-full `}>
            <div className="container-x mx-auto flex gap-3">
                    <div
                        data-aos="fade-right"
                        className={`h-full sm:mb-0 mb-5 `}
                    >
                        <Link to="/single-product">
                            <img src={"assets/images/viski.jpg"} alt="" className="w-full sm:h-full h-auto"/>
                        </Link>
                    </div>
                        <div data-aos="fade-right"
                             className={`h-full sm:mb-0 mb-5 `}
                        >
                            <Link to="/single-product">
                                <img src={"assets/images/viski.jpg"} alt="" className="w-full sm:h-full h-auto"/>
                            </Link>
                        </div>
                </div>
        </div>
    );
}

