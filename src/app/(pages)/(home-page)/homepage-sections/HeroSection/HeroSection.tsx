"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";
import Banner5 from "../../../../../../public/banners/banner5.png";

const HeroSection = () => {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

    return (
        <section className="container mx-auto px-3 pt-26 pb-5 sm:px-0 sm:pt-31 md:pt-22">
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}>
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="">
                                <Card>
                                    <CardContent className="relative flex items-center justify-center rounded-lg p-0">
                                        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                                            <Image
                                                src={Banner5}
                                                alt="banner"
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <span className="absolute z-10 text-6xl font-semibold text-green-500">
                                            Banner {index + 1}
                                        </span>
                                        <CarouselPrevious
                                            variant="default"
                                            className="top-1/2 left-5 bg-primary text-white"
                                        />

                                        <CarouselNext
                                            variant="default"
                                            className="top-1/2 right-5 bg-primary text-white"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default HeroSection;
