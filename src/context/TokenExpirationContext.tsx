"use client";
import useLogout from "@/hooks/useLogout ";
import { RootState } from "@/lib/store";
import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    exp: number; // Expiry timestamp
}

// Decode JWT and check expiry
const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);

        // Check if the token is expired
        if (decoded.exp * 1000 < Date.now()) {
            console.log("Access token has expired.");
            return null;
        }

        return decoded;
    } catch (error) {
        console.log("Invalid token:", error);
        return null;
    }
};

const TokenExpirationContex = ({ children }: { children: React.ReactNode }) => {
    const { accesstoken } = useSelector((state: RootState) => state.user);
    const handleLogout = useLogout();

    if (accesstoken) {
        const decoded = decodeToken(accesstoken);
        console.log("Token expiration time:", decoded?.exp || Date.now);

        if (decoded && decoded.exp) {
            const expireTimestamp = Number(decoded.exp);
            const now = new Date();
            const expireDate = new Date(Number(expireTimestamp) * 1000); // Convert to milliseconds
            const remainingTimeInMilliseconds = differenceInMilliseconds(expireDate, now);
            const formattedRemainingTime = formatDistanceToNow(expireDate, {
                addSuffix: true,
            });
            console.log(`Remaining formated time: ${formattedRemainingTime} milliseconds`);
            console.log(`Remaining time: ${remainingTimeInMilliseconds} milliseconds`);

            if (remainingTimeInMilliseconds > 0) {
                setTimeout(async () => {
                    handleLogout();
                    toast.warning("Session expired.Please login again.")
                }, remainingTimeInMilliseconds);
            }
        }
    }

    return <>{children}</>;
};

export default TokenExpirationContex;
