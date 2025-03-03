import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <main className="sticky top-0 z-[1000] w-full bg-primary px-2 py-2 drop-shadow-md sm:px-0 sm:py-3 md:py-4">
            <section className="container mx-auto">
                <section className="flex w-full items-center justify-between">
                    <section className="flex items-center gap-1">
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
                    <section className="px-5 sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[750px]">
                        <div className="relative bg-transparent">
                            <Label
                                htmlFor="search"
                                className="absolute top-1/2 right-0 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-full bg-accent px-1 py-2 text-primary sm:px-4">
                                <Search />
                            </Label>
                            <Input
                                id="search"
                                placeholder="Search Your Products"
                                className="rounded-full bg-accent placeholder:text-sm md:placeholder:text-base"
                            />
                        </div>
                    </section>
                    <section className="flex items-center gap-2 justify-self-end">
                        <Link
                            href="#"
                            className="hidden rounded-md bg-accent p-2 text-primary sm:block">
                            <ShoppingCart size={19} />
                        </Link>

                        <Link
                            href="#"
                            className="flex items-center gap-0.5 rounded-md bg-accent p-2 text-sm font-semibold text-nowrap text-primary sm:gap-1.5">
                            <CircleUser size={19} className="hidden sm:block" /> Sign in
                            <span className="max-[430px]:hidden"> / Sign up</span>
                        </Link>
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
