import {useEffect, useState} from "react";
import {getProductById} from "../../Services/HttpServices/ProductsHttpService.js";
import {localStorageKeys} from "../../constants/lockalStorageDatas.js";
import RemoveButton from "./RemoveButton.jsx";


export default function ProductsTable() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const likedProductIds = JSON.parse(localStorage.getItem(localStorageKeys.wishlist)) || [];
        async function productsResponse() {
            const fetchedProducts = await Promise.all(
                likedProductIds.map(async (item) => {
                    return await getProductById(item);
                })
            );
                setProductData(fetchedProducts);
        }
        productsResponse();
    }, []);
    return (
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                    <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">Product</td>
                    <td className="py-4 whitespace-nowrap text-center">Price</td>
                    <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
                </tr>
                {productData.map((product) => (
                    <tr key={product.data.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="pl-10 py-4 w-[380px]">
                            <div className="flex space-x-6 items-center">
                                <div
                                    className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                                    <img src={product.data.media_urls[0]} alt=""/>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <p className="font-medium text-[15px] text-qblack">{product.data.name}</p>
                                </div>
                            </div>
                        </td>
                        <td className="text-center py-4 px-2">
                            <p className="text-[15px] font-normal">${product.data.price}</p>
                        </td>
                        <td className="text-right py-4 p-[10px]">
                            <RemoveButton
                                productId={product.data.id}
                                onRemove={(id) => {
                                    setProductData(prevProducts => prevProducts.filter(product => product.data.id !== id));
                                }}

                            />

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
