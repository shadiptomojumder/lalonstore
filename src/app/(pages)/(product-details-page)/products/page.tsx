"use client";
import getProducts from "@/api/products/getProducts";
import ProductLoading from "@/components/loading/ProductLoading";
import ProductCard from "@/components/shared/ProductCard";
import ProductFilterBar from "@/components/shared/ProductFilterBar";
import { Category } from "@/interfaces/category.schemas";
import { Product } from "@/interfaces/product.schemas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const page = () => {
    const searchParams = useSearchParams();
    // Extract the "category" parameter from searchParams
    const categoryOnParams = searchParams.get("category");

    const filters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        filters[key] = value;
    }

    // console.log("The Filters are: ", filters);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ["products",filters],
        queryFn: () => getProducts(filters),
    });

    
    let category: Omit<Category, "createdAt" | "updatedAt"> | null = null;
    if (categoryOnParams && categoryOnParams !== null) {
        // Extracting the category from the first product
        category = products ? (products[0]?.category ?? null) : null;
    }

    // console.log("The products are:", products);
    // console.log("The category is:", category);

    return (
        <div className="container mx-auto px-3 pt-5 pb-5 sm:px-0 sm:pt-10">
            {category && (
                <div>
                    <Image
                        src={category?.thumbnail}
                        alt={category?.title}
                        height={100}
                        width={250}
                        className="aspect-[5.88] h-full w-full"
                    />
                </div>
            )}

            <ProductFilterBar />

            <div className="mt-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {Array.from({ length: 6 }, (_, index) => (
                            <ProductLoading key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {products?.map((product: Product) => {
                            return <ProductCard key={product?.id} product={product} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
