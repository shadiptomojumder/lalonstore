"use client";
import getProducts from "@/api/products/getProducts";
import { Product } from "@/interfaces/product.schemas";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const page = () => {
    const searchParams = useSearchParams();

    const filters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        filters[key] = value;
    }

    console.log("The Filters are: ", filters);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => getProducts(filters),
    });

    console.log("The products are:", products);

    return (
        <div className="py-15">
            <h2>This is Product page</h2>
            <div>
                {isLoading ? (
                    <p>Loading....</p>
                ) : (
                    <>
                        {products?.map((product: Product) => {
                            return (
                                <div
                                    className="h-10 w-[330px] border border-gray-500 p-4"
                                    key={product.id}>
                                    <p>{product.name}</p>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default page;
