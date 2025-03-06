import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import WhishlistProductsTable from "./WhishlistProductsTable.jsx";

export default function Wishlist({ wishlist = true }) {
  return (
      <Layout childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
        {wishlist === false ? (
            <div className="wishlist-page-wrapper w-full">
              <div className="container-x mx-auto px-4">
                <BreadcrumbCom
                    paths={[
                      { name: "home", path: "/" },
                      { name: "wishlist", path: "/wishlist" },
                    ]}
                />
                <EmptyWishlistError />
              </div>
            </div>
        ) : (
            <div className="wishlist-page-wrapper w-full bg-white pb-10">
              <div className="w-full">
                <PageTitle
                    title="Wishlist"
                    breadcrumb={[
                      { name: "home", path: "/" },
                      { name: "wishlist", path: "/wishlist" },
                    ]}
                />
              </div>
              <div className="w-full mt-6">
                <div className="container-x mx-auto px-4">
                  <WhishlistProductsTable className="mb-6" />
                </div>
              </div>
            </div>
        )}
      </Layout>
  );
}
