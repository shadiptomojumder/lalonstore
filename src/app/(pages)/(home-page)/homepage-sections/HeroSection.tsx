"use client";
import { Carousel, CarouselContent, CarouselItem, Next, Previous } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";
import Banner1 from "../../../../../public/banners/banner5.jpg";
import Banner2 from "../../../../../public/banners/banner8.webp";
import Banner3 from "../../../../../public/banners/banner3.jpg";
import Banner4 from "../../../../../public/banners/banner4.jpg";
import Banner5 from "../../../../../public/banners/banner6.jpeg";

const HeroSection = () => {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

    return (
        <section className="container mx-auto px-3 pt-5 pb-5 sm:px-0 sm:pt-10">
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}>
                <CarouselContent>
                    <CarouselItem>
                        <section className="rounded-lg bg-gray-200 p-0">
                            <Image
                                src={Banner1}
                                alt="banner"
                                className="aspect-[1600/700] h-full w-full rounded-lg object-cover object-center"
                                priority
                            />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className="rounded-lg bg-gray-200 p-0">
                            <Image
                                src={Banner2}
                                alt="banner"
                                className="aspect-[1600/700] h-full w-full rounded-lg object-cover object-center"
                                priority
                            />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className="rounded-lg bg-gray-200 p-0">
                            <Image
                                src={Banner3}
                                alt="banner"
                                className="aspect-[1600/700] h-full w-full rounded-lg object-cover object-center"
                                priority
                            />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className="rounded-lg bg-gray-200 p-0">
                            <Image
                                src={Banner4}
                                alt="banner"
                                className="aspect-[1600/700] h-full w-full rounded-lg object-cover object-center"
                                priority
                            />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className="rounded-lg bg-gray-200 p-0">
                            <Image
                                src={Banner5}
                                alt="banner"
                                className="aspect-[1600/700] h-full w-full rounded-lg object-cover object-center"
                                priority
                            />
                        </section>
                    </CarouselItem>
                </CarouselContent>
                <Previous className="-left-3.5 bg-primary text-white" />
                <Next className="-right-3.5 bg-primary text-white" />
            </Carousel>
        </section>
    );
};

export default HeroSection;
