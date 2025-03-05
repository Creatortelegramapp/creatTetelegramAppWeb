import RemoveButton from "../../components/Wishlist/RemoveButton.jsx";
import { Link } from "react-router-dom";

export default function ProductsTable({ products, onRemove, onQuantityChange }) {
    return (
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                    <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">Product</td>
                    <td className="py-4 whitespace-nowrap text-center">Price</td>
                    <td className="py-4 whitespace-nowrap text-center w-[200px]">Quantity</td>
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
                        <td className="text-center py-4 px-2">
                            <p className="text-[15px] font-normal">
                                {(product.price && !isNaN(product.price) && product.quantity && !isNaN(product.quantity))
                                    ? (product.price * product.quantity).toFixed(2)
                                    : 'Invalid Price'}
                            </p>
                        </td>
                        <td className="text-center py-4">
                            <div className="flex items-center justify-center space-x-2">
                                <button
                                    onClick={() => onQuantityChange(product.id, -1)}
                                    className="px-3 py-1 border border-[#EDEDED] rounded text-gray-500 hover:text-black"
                                    disabled={product.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="mx-2">{product.quantity}</span>
                                <button
                                    onClick={() => onQuantityChange(product.id, 1)}
                                    className="px-3 py-1 border border-[#EDEDED] rounded text-gray-500 hover:text-black"
                                >
                                    +
                                </button>
                            </div>
                        </td>
                        <td className="text-right py-4 pr-10">
                            <RemoveButton
                                productId={product.id}
                                onRemove={onRemove}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
