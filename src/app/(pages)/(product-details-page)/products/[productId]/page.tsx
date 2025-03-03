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
                <div className="p-5 bg-gray-300 rounded-lg">
                    {product && (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="p-2 aspect-square"
                        />
                    )}
                </div>
                <div>
                    <p className="text-base font-medium">{product?.name}</p>
                    <p className="text-base font-medium">{product?.name}</p>
                </div>
            </section>
        </main>
    );
};

export default ProductDetailsPage;
