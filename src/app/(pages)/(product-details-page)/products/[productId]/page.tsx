"use client";
import getProductById from "@/api/products/getProductById";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
    const params = useParams(); // Get URL parameters

    const { productId } = params;

    console.log("The productId is:", productId);
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById({ productId: productId as string }),
    });

    console.log("The product is:", product);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="container mx-auto px-3 sm:px-0">
            <section>
                <div>
                    {product && (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={100}
                            height={100}
                            className=""
                        />
                    )}
                </div>
                <div></div>
            </section>
        </main>
    );
};

export default ProductDetailsPage;
