import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import for getting product ID
import {getProductById} from "../../Services/HttpServices/ProductsHttpService.js"; // API function
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import BreadcrumbCom from "../BreadcrumbCom";

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
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p>🔄 Բեռնվում է...</p>;
  if (error) return <p>❌ Սխալ։ {error}</p>;
  if (!product) return <p>❌ Ապրանք չի գտնվել</p>;

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
                <ProductView product={product} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
