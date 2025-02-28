// Interface representing an image file.
export interface ImageFile {
    id: string;
    file: File;
    preview: string;
    name: string;
    type: string;
}

// Interface representing API Response.
export interface APIResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    } | null;
    data?: T | null;
}

// Interface representing API Error.
export interface APIError {
    success: boolean;
    statusCode: number;
    message: string;
    errorMessages?: { path: string; message: string }[];
    stack?: string;
}
