import { APIResponse } from "@/interfaces/common.schemas";
import { Product } from "@/interfaces/product.schemas";
import { AxiosError } from "axios";
import { api } from "../api";

/**
 * Interface for product query parameters
 */
interface ProductQueryParams {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    limit?: number;
    page?: number;
    name?: string;
    price?: number;
    sku?: string;
    category?: string; // Optional: Fetch by category
}

const getAllProducts = async (queryParams: ProductQueryParams = {}): Promise<Product[]> => {
    try {
        // Build query string dynamically
        const buildQueryString = (queryParams: ProductQueryParams) => {
            return Object.entries(queryParams)
                .filter(([, value]) => value !== undefined && value !== null)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
                )
                .join("&");
        };

        const queryString = buildQueryString(queryParams);

        const url = queryString ? `/products?${queryString}` : "/products";

        const response = await api.get<APIResponse<Product[]>>(url);
        console.log("The Get ALL Product API Response is:", response);

        return response.data?.data ?? [];
    } catch (error) {
        console.log("The Get ALL Product API Error is:", error);

        if (error instanceof AxiosError && error.response) {
            console.error("Server Error:", error.response.data);
            throw error.response.data; // Throwing the actual API error response
        }

        throw new Error("An unknown error occurred");
    }
};

export default getAllProducts;
