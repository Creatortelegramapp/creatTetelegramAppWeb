import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import for getting product ID
import {getProductById} from "../../Services/HttpServices/ProductsHttpService.js"; // API function
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import BreadcrumbCom from "../BreadcrumbCom";
import {Loading, Error} from "../Loading/index.jsx";

export default function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (err) {
        setError("Throw Error");
      } finally {
        setLoading(false);
      }
    };
      fetchProduct();
  }, [productId]);

  if (loading) return <p><Loading/></p>;
  if (error) return <p>{Error}</p>;

  return (
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                    paths={[
                      { name: "Գլխավոր", path: "/" },
                      { name: product.name, path: `/product/${product.id}` },
                    ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView product={product.data} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
