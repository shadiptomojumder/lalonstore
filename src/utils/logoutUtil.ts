import { logout, setLoading } from "@/lib/slices/userSlice";
import { store } from "@/lib/store";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";

// Shared logout utility function
export const LogoutUtil = () => {
    const dispatch = useDispatch();
    dispatch(setLoading(true)); // Set loading state to true

    // Clear user state
    dispatch(logout());

    // Clear localStorage
    localStorage.clear();

    // Clear all persisted state
    persistStore(store).purge();
    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
    });

    dispatch(setLoading(false)); // Set loading state to false
};
