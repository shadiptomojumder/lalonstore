"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { GetCategory } from "@/StaticData/CategoryData/CategoryData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PopularCategorieSection = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["categories"],
        queryFn: GetCategory,
    });

    const CategoryList = data;
    // console.log("data is", data);

    return (
        <section className="container mx-auto px-3 sm:px-0">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full">
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-black md:text-lg lg:text-2xl">
                        Popular Categories
                    </h2>
                    <div className="relative w-[80px]">
                        <CarouselPrevious
                            variant="default"
                            className="absolute top-1/2 left-0 z-50 bg-primary text-white"
                        />
                        <CarouselNext
                            variant="default"
                            className="absolute top-1/2 right-0 z-50 bg-primary text-white"
                        />
                    </div>
                </div>
                <CarouselContent className="h-full w-full">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 10 }, (_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="w-full basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                                    <p>Loading.......</p>
                                </CarouselItem>
                            ))}
                        </>
                    ) : (
                        <>
                            {CategoryList &&
                                CategoryList.length > 0 &&
                                CategoryList.map((category, index: number) => (
                                    <CarouselItem
                                        key={index}
                                        className="w-full basis-1/3 min-[450px]:basis-1/5 sm:basis-1/5 md:basis-1/6 lg:basis-1/7 xl:basis-1/9 2xl:basis-1/9">
                                        <Link href={`/${category.link}`} className="p-1">
                                            <div className="bg-white pb-1">
                                                <div className="flex items-center justify-center rounded-lg bg-white">
                                                    <Image
                                                        src={category?.categoryImage}
                                                        alt="food"
                                                        width={200}
                                                        height={200}
                                                        className="sm:h-[100px] h-[80px] w-[80px] sm:w-[100px] rounded-full border-2 border-primary object-cover object-center"
                                                    />
                                                </div>
                                                <p className="text-center mt-1 text-sm font-semibold capitalize group-hover:text-[#2C742F] sm:text-base">
                                                    {category.categoryTitle}
                                                </p>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                        </>
                    )}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </section>
    );
};

export default PopularCategorieSection;
