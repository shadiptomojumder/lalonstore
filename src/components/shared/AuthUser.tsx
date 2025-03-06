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
import { RootState } from "@/lib/store";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const AuthUser = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.user);
    console.log("Redux User is:", user);
    console.log("Redux isLoading is:", isLoading);
    const handleLogout = useLogout();

    return (
        <>
            {isLoading ? (
                <div>User Loading...</div>
            ) : (
                <>
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex cursor-pointer items-center gap-1.5 rounded-md bg-accent p-2 text-sm font-semibold text-primary">
                                        <CircleUser size={19} /> <span>Shadipto</span>
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
                                            Keyboard shortcuts
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
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
