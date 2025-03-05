"use client";
import getCategoryById from "@/api/categories/getCategoryById";
import getProducts from "@/api/products/getProducts";
import ProductLoading from "@/components/loading/ProductLoading";
import ProductCard from "@/components/shared/ProductCard";
import ProductFilterBar from "@/components/shared/ProductFilterBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/interfaces/product.schemas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductPagination from "../component/Pagination";
import { useEffect, useState } from "react";
import { APIResponse } from "@/interfaces/common.schemas";

const page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Extract the "category" parameter from searchParams
    const categoryId = searchParams.get("category");
    const { data: category, isLoading: categoryIsLoading } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getCategoryById({ categoryId: categoryId as string }),
        enabled: !!categoryId,
    });

    const filters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        filters[key] = value;
    }
    filters.page = currentPage.toString();

    const { data , isLoading } = useQuery<APIResponse<Product[]>>({
        queryKey: ["products", filters],
        queryFn: () => getProducts(filters),
    });

    const products=data?.data

    useEffect(() => {
        if (data) {
            setTotalPages(data.meta?.total ?? 1);
        }
    }, [data]);

    console.log("The products are:", products);
    // console.log("The category is:", category);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const newSearchParams = new URLSearchParams(filters);
        newSearchParams.set("page", page.toString());
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <div className="container mx-auto px-3 pt-5 pb-5 sm:px-0 sm:pt-10">
            {categoryId && (
                <>
                    {categoryIsLoading ? (
                        <Skeleton className="aspect-[5.88] h-full w-full bg-gray-300"></Skeleton>
                    ) : (
                        <>
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
                        </>
                    )}
                </>
            )}

            <ProductFilterBar filters={filters} pathname={pathname} router={router} />

            <div className="">
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

                {/* Product Not Found */}
                {products?.length === 0 ? (
                    <div className="flex h-[45dvh] items-center justify-center">
                        <p className="text-center text-lg font-semibold text-gray-500">
                            No products found here.
                        </p>
                    </div>
                ) : null}
            </div>

            <ProductPagination currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}/>
        </div>
    );
};

export default page;
