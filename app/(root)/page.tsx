import ProductList from "@/components/shared/product/product-list";
import { getLatestproducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestproducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  );
};

export default Homepage;
