"use client";
import getAllProducts from "@/api/products/getProducts";
import CategoryLoading from "@/components/loading/CategoryLoading";
import ProductCard from "@/components/shared/ProductCard";
import { Carousel, CarouselContent, CarouselItem, Next, Previous } from "@/components/ui/carousel";
import { Product } from "@/interfaces/product.schemas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import oppo from "../../../../../public/banners/banner1.png"
import leaf1 from "../../../../../public/banners/leaf4.jpg"


const FeaturedProducts = () => {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ["products",{ isFeatured: true }],
        queryFn: () => getAllProducts({ isFeatured: true }),
    });

    console.log("The products are:", products);

    return (
        <div className="py-12" style={{ backgroundImage: `url(${leaf1.src})` }}>
            <div className="container mx-auto px-3 sm:px-0">
                <h2 className="mb-5 text-center font-rubik text-xl font-semibold text-white uppercase md:text-lg lg:text-2xl">
                    Featured Products 🎇
                </h2>

                <Carousel
                    opts={{
                        dragFree: true,
                    }}>
                    <CarouselContent className="-ml-8">
                        {isLoading ? (
                            <>
                                {Array.from({ length: 10 }, (_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="w-full basis-1/2 min-[450px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/6 2xl:basis-1/6">
                                        <CategoryLoading />
                                    </CarouselItem>
                                ))}
                            </>
                        ) : (
                            <>
                                {products &&
                                    products.length > 0 &&
                                    products.map((product: Product, index: number) => (
                                        <CarouselItem
                                            key={index}
                                            className="w-full basis-1/2 pl-8 min-[450px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/6 2xl:basis-1/6">
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                            </>
                        )}
                    </CarouselContent>
                    <Previous className="-left-3.5 bg-primary text-white" />
                    <Next className="-right-3.5 bg-primary text-white" />
                </Carousel>
            </div>
        </div>
    );
};

export default FeaturedProducts;
