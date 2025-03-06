import {useEffect, useState} from "react";
import {getProductById} from "../../Services/HttpServices/ProductsHttpService.js";
import {localStorageKeys} from "../../constants/lockalStorageDatas.js";
import ProductsTable from "../../shared/components/ProductsTable.jsx";


export default function WhishlistProductsTable() {
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

    const onRemove = (id) => {
        setProductData(prevProducts => prevProducts.filter(product => product.id !== id));
    }

    if (productData.length) {
        return (
            <ProductsTable products={productData} onRemove={onRemove} isCart={false} />
        );
    }

    return <></>;
}
