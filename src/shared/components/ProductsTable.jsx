import RemoveButton from "../../components/Wishlist/RemoveButton.jsx";
import { Link } from "react-router-dom";
import { useCartProducts } from "../../hooks/useCartProducts.jsx";

export default function ProductsTable({ products, onRemove, isCart }) {
    const { quantityChange, addProductById } = useCartProducts();

    const addProduct = (e, id) => {
        e.preventDefault();
        addProductById(id);
    };

    return (
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 hidden sm:table">
                <tbody>
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                    <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">Product</td>
                    {isCart && (
                        <>
                            <td className="py-4 whitespace-nowrap text-center">Price</td>
                            <td className="py-4 whitespace-nowrap text-center w-[200px]">Quantity</td>
                        </>
                    )}
                    <td className="py-4 whitespace-nowrap text-center w-[200px]"></td>
                </tr>
                {products?.map((product) => (
                    <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="pl-10 py-4 w-[380px]">
                            <div className="flex space-x-6 items-center">
                                <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                                    <Link to={`/single-product/${product.id}`}>
                                        <img src={product.media_urls[0]} alt="" />
                                    </Link>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <p className="font-medium text-[15px] text-qblack">{product.name}</p>
                                </div>
                            </div>
                        </td>
                        {isCart && (
                            <td className="text-center py-4 px-2">
                                <p className="text-[15px] font-normal">
                                    {(product.price && !isNaN(product.price) && (product.quantity || product.quantity === 0) && !isNaN(product.quantity))
                                        ? (product.price * product.quantity).toFixed(2)
                                        : 'Invalid Price'}
                                </p>
                            </td>
                        )}
                        {isCart && (
                            <td className="text-center py-4">
                                <div className="flex items-center justify-center space-x-2">
                                    <button
                                        onClick={() => quantityChange(product.id, -1)}
                                        className="px-3 py-1 border border-[#EDEDED] rounded text-gray-500 hover:text-black"
                                        disabled={product.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{product.quantity}</span>
                                    <button
                                        onClick={() => quantityChange(product.id, 1)}
                                        className="px-3 py-1 border border-[#EDEDED] rounded text-gray-500 hover:text-black"
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                        )}
                        {!isCart && (
                            <td className="text-center py-4 px-2">
                                <button
                                    type="button"
                                    className="bg-yellow-500 text-white px-4 py-2 text-sm rounded hover:bg-yellow-600 transition"
                                    onClick={(e) => addProduct(e, product.id)}
                                >
                                    Add To Cart
                                </button>
                            </td>
                        )}
                        <td className="text-right py-4 pr-10">
                            <RemoveButton productId={product.id} onRemove={onRemove} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="sm:hidden flex flex-col space-y-4">
                {products?.map((product) => (
                    <div key={product.id} className="bg-white border rounded-lg p-4 flex items-center space-x-4">
                        <div className="w-16 h-16 border border-[#EDEDED] overflow-hidden">
                            <Link to={`/single-product/${product.id}`}>
                                <img src={product.media_urls[0]} alt={product.name} className="w-full h-full object-cover" />
                            </Link>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <p className="text-[14px] font-medium text-qblack">{product.name}</p>
                            {!isCart && (
                                <button
                                    type="button"
                                    className="bg-yellow-500 text-white px-2 py-1 text-xs rounded hover:bg-yellow-600 transition"
                                    onClick={(e) => addProduct(e, product.id)}
                                >
                                    Add To Cart
                                </button>
                            )}
                        </div>
                        {isCart && (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => quantityChange(product.id, -1)}
                                    className="px-2 py-1 border rounded text-gray-500 hover:text-black"
                                    disabled={product.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="text-sm">{product.quantity}</span>
                                <button
                                    onClick={() => quantityChange(product.id, 1)}
                                    className="px-2 py-1 border rounded text-gray-500 hover:text-black"
                                >
                                    +
                                </button>
                            </div>
                        )}
                        <RemoveButton productId={product.id} onRemove={onRemove} />
                    </div>
                ))}
            </div>
        </div>
    );
}
