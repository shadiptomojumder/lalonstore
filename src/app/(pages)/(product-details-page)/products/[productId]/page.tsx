import { Product } from "@/interfaces/product.schemas";
import axios from "axios";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

// Function to fetch all products
const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/products");
        console.log("The Get ALL Product API Response is:", response);
        return response.data?.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("An unknown error occurred while fetching products");
    }
};

export async function generateStaticParams() {
    try {
        const productData = await getProducts();
        console.log("Product Details:", productData);
        return productData.map((product: Product) => ({
            productId: String(product.id),
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

const ProductDetailsPage = async () => {
    // const product = await getProductById("67c210b0242ac346afc86b36");
    // console.log("Product Details:", product);

    return <div>Product details</div>;
};

export default ProductDetailsPage;
