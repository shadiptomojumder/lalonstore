import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <main className="bg-primary fixed top-0 z-50 w-full md:py-4 sm:py-3 py-2">
            <section className="container mx-auto px-3 sm:px-0">
                <section className="grid w-full grid-cols-2 md:grid-cols-3 items-center">
                    <section className="">
                        <p className="text-3xl font-bold italic">SKB BEST</p>
                    </section>
                    <section className="hidden w-full px-5 md:block">
                        <div className="relative bg-transparent">
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
                    </section>
                    <section className="flex items-center gap-2 justify-self-end">
                        <Link href="#" className="rounded-md bg-accent p-2 text-primary">
                            <ShoppingCart size={19} />
                        </Link>

                        {/* <Link
                    href="#"
                    className="flex items-center gap-1.5 rounded-md bg-accent p-2 text-sm font-semibold text-primary">
                    <CircleUser size={19} /> Pitu
                </Link> */}

                        <Link
                            href="#"
                            className="flex items-center gap-1.5 rounded-md bg-accent p-2 text-sm font-semibold text-primary">
                            <CircleUser size={19} /> Sign in<span className="max-[430px]:hidden"> / Sign up</span>
                        </Link>
                    </section>
                </section>
                <section className="w-full md:hidden sm:mt-3 mt-2">
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
                </section>
            </section>
        </main>
    );
};

export default Header;
