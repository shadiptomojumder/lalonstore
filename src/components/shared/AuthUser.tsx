"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout ";
import { setLoading } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { CircleUser, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthUser = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.user);
    const { items } = useSelector((state: RootState) => state.cart);
    // console.log("Redux User is:", user);
    // console.log("Redux isLoading is:", isLoading);
    const handleLogout = useLogout();
    const dispatch = useDispatch();

    useEffect(() => {
        // Set loading state to false after initial check
        dispatch(setLoading(false));
    }, [dispatch]);

    return (
        <>
            <Link
                href="/checkout"
                className="relative hidden rounded-md bg-accent p-2 text-primary sm:block">
                <ShoppingCart size={20} />
                {items && items.length > 0 ? (
                    <div className="absolute -top-2.5 -right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue-200 text-xs font-semibold">
                        {items?.length}
                    </div>
                ) : (
                    <></>
                )}
            </Link>
            {isLoading ? (
                <div>User Loading...</div>
            ) : (
                <>
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {/* <div className="flex cursor-pointer items-center gap-1.5 rounded-md bg-accent p-2 text-sm font-semibold text-primary">
                                        <CircleUser size={20} /> <span className="hidden sm:block">Shadipto</span>
                                    </div> */}
                                    <div className="flex cursor-pointer items-center gap-1.5 rounded-full bg-accent p-0 text-sm font-semibold text-primary sm:rounded-md sm:p-2">
                                        <CircleUser className="h-[35px] w-[35px] sm:h-[20px] sm:w-[20px]" />{" "}
                                        <span className="hidden sm:block">Shadipto</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="z-[2255] w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Billing
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/dashboard">
                                                Dashboard
                                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-0.5 rounded-md bg-accent p-2 text-sm font-semibold text-nowrap text-primary sm:gap-1.5">
                                <CircleUser size={19} className="hidden sm:block" /> Sign in
                                <span className="max-[430px]:hidden"> / Sign up</span>
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default AuthUser;
