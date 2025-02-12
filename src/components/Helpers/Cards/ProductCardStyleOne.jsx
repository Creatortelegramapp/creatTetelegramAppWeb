import { Link } from "react-router-dom";

export default function ProductCardStyleOne({ datas }) {
    const product = datas;

    return (
        <div className="product-card-one w-full">
            <div className="product-card w-full h-full bg-white relative group overflow-hidden mb-5 transition-transform transform group-hover:scale-50">
                <div className="product-card-img max-w-full h-[300px]">
                    <img
                        src={product.media_urls[0]}
                        alt={product.name}
                        className="w-full h-[300px] object-cover"
                    />
                </div>
                <div className="product-card-details px-4 py-4 relative">
                    <div className="absolute w-full h-10 px-4 left-0 top-40 group-hover:top-[50px] transition-all duration-300 ease-in-out">
                        <button
                            type="button"
                            className="yellow-btn w-full bg-yellow-400 text-white py-2 rounded-md flex justify-center items-center hover:bg-yellow-500 transition-all"
                        >
                            <span>Add To Cart</span>
                        </button>
                    </div>
                    <Link to={`/single-product/${product.id}`}>
                        <p className="title mb-2 text-[16px] font-semibold text-gray-800 leading-[24px] line-clamp-2 hover:text-blue-600">
                            {product.name}
                        </p>
                    </Link>
                    <div className="price">
                        <div className="main-price font-semibold text-[18px] text-gray-600">
                            <p>{product.price}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
