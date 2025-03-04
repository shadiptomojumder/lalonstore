"use client";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductFilterBar = () => {
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const filters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        filters[key] = value;
    }

    const fullUrl = `${pathname}?${searchParams.toString()}`;

    console.log("The Filters are: ", filters);
    console.log("Current Pathname is", pathname);
    console.log("Full URL is", fullUrl);
    console.log("sortBy is", sortBy);
    console.log("sortOrder is", sortOrder);

       useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (sortBy) {
            newSearchParams.set("sortBy", sortBy);
        } else {
            newSearchParams.delete("sortBy");
        }
        if (sortOrder) {
            newSearchParams.set("sortOrder", sortOrder);
        } else {
            newSearchParams.delete("sortOrder");
        }
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    }, [sortBy, sortOrder, pathname, router, searchParams]);

    return (
        <main>
            <section className="pb-3 flex flex-col items-start gap-4">
                <div className="flex items-center sm:gap-3 gap-2 flex-wrap">
                    <p className="font-semibold">Sort By :</p>
                    <Button
                        onClick={() => {
                            setSortBy("");
                            setSortOrder("");
                        }}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${sortBy=="" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium":""}`}
                    >
                        Default
                    </Button>
                    <Button
                        onClick={() => {
                            setSortBy("price");
                            setSortOrder("asc");
                        }}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${sortBy === "price" && sortOrder === "asc" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium":""}`}
                    >
                        Price asc
                    </Button>
                    <Button
                        onClick={() => {
                            setSortBy("price");
                            setSortOrder("desc");
                        }}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${sortBy === "price" && sortOrder === "desc" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium":""}`}
                    >
                        Price desc
                    </Button>
                    {/* <Button
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${sortBy=="newest" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium":""}`}
                    >
                        Newest
                    </Button> */}
                </div>
            </section>
        </main>
    );
};

export default ProductFilterBar;

