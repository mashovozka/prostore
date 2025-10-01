"use client";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("api/product");
        if (!res.ok) {
          throw Error("Failed to fetch products");
        }
        const products = await res.json();
        console.log("products", products);
        setProducts(products);
      } catch (e) {
        console.log("Couldn't get data");
      }
    };
    getProducts();
  }, []);

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
