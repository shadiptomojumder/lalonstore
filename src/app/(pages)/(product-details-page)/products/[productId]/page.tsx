"use client"
import getProductById from "@/api/products/getProductById";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
    const params = useParams(); // Get URL parameters

    const { productId } = params;

    console.log("The productId is:", productId);
    const { data: product } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById({ productId: productId as string }),
    });

    console.log("The product is:", product);

    return <div>Product details</div>;
};

export default ProductDetailsPage;
