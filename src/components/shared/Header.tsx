import { Menu } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import AuthUser from "./AuthUser";
import SearchProduct from "./SearchProduct";

const Header = () => {
    return (
        <main className="sticky top-0 z-[1000] w-full bg-primary px-2 py-2 drop-shadow-md sm:px-0 sm:py-3 md:py-4">
            <section className="container mx-auto">
                <section className="flex w-full items-center justify-between">
                    <section className="flex items-center gap-0.5">
                        <Menu size={28} className="sm:hidden" />
                        <Link href="/">
                            <p className="hidden font-montserrat text-2xl font-bold text-nowrap italic sm:block">
                                Lalon Store
                            </p>
                        </Link>
                        <Link href="/">
                            <p className="font-montserrat text-xl font-bold italic sm:hidden">
                                Store
                            </p>
                        </Link>
                    </section>
                    <section className="w-full px-3 sm:w-[350px] sm:px-5 md:w-[450px] lg:w-[550px] xl:w-[750px]">
                        <Suspense fallback={<div>Loading search...</div>}>
                            <SearchProduct />
                        </Suspense>
                    </section>
                    <section className="flex items-center gap-3 justify-self-end">
                        <AuthUser />
                    </section>
                </section>
                {/* <section className="mt-2 w-full sm:mt-3 md:hidden">
                    <div className="relative">
                        <Label
                            htmlFor="search"
                            className="absolute top-1/2 right-0 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-full bg-[#2992F21C] px-4 py-2 text-primary">
                            <Search />
                        </Label>
                        <Input
                            id="search"
                            placeholder="Search by keyword "
                            className="rounded-full bg-accent ring-[#2992F233]"
                        />
                    </div>
                </section> */}
            </section>
        </main>
    );
};

export default Header;
