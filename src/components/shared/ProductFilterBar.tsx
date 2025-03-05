"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ProductFilterBarProps {
    filters: { [key: string]: string };
    router: any;
    pathname: string;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ filters, router, pathname }) => {
    // Extract sorting params from the URL
    const sortBy = filters.sortBy || "";
    const sortOrder = filters.sortOrder || "";

    const updateSorting = (newSortBy: string, newSortOrder: string) => {
        const newSearchParams = new URLSearchParams(filters);
        if (newSortBy) {
            newSearchParams.set("sortBy", newSortBy);
        } else {
            newSearchParams.delete("sortBy");
        }

        if (newSortOrder) {
            newSearchParams.set("sortOrder", newSortOrder);
        } else {
            newSearchParams.delete("sortOrder");
        }

        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <main>
            <section className="py-7 flex flex-col items-start gap-4">
                <div className="flex items-center sm:gap-3 gap-2 flex-wrap">
                    <p className="font-semibold">Sort By :</p>
                    <Button
                        onClick={() => updateSorting("", "")}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${
                            !sortBy ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium" : ""
                        }`}
                    >
                        Default
                    </Button>
                    <Button
                        onClick={() => updateSorting("price", "asc")}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${
                            sortBy === "price" && sortOrder === "asc" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium" : ""
                        }`}
                    >
                        Price asc
                    </Button>
                    <Button
                        onClick={() => updateSorting("price", "desc")}
                        variant={"outline"}
                        className={`border-none shadow-md bg-slate-100 h-7 sm:h-9 px-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-black hover:text-black ${
                            sortBy === "price" && sortOrder === "desc" ? "bg-[#73dd76] hover:bg-[#73dd76] font-medium" : ""
                        }`}
                    >
                        Price desc
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default ProductFilterBar;
