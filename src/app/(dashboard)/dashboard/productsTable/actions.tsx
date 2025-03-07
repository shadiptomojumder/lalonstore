import deleteProducts from "@/api/products/deleteProduct";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, Pencil, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import AddStock from "./add-stock";

const Actions = ({ productId }: { productId: string }) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: [],
        mutationFn: deleteProducts,
        onSuccess: (response) => {
            console.log("the res is ", response);

            if (response.statusCode === 200) {
                toast.success("Product successfully deleted");
                queryClient.invalidateQueries({ queryKey: ["products"] });
            }
        },
        onError: (error: AxiosError) => {
            if (error?.response?.status == 400) {
                toast.warning("Missing product Id");
            } else if (error?.response?.status == 500) {
                toast.error("Something went wrong during an appointment");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.log("Error while sending the request:", error.message);
            }
        },
    });

    const handleDelete = () => {
        mutate({ productId });
    };

    return (
        <>
            <div className="hidden items-center gap-2 min-sm:flex">
                <Link
                    href={`/dashboard/products/edit/${productId}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7f2dc] text-primary">
                    <Pencil size={18} />
                </Link>
                <button
                    onClick={() => handleDelete()}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-200 text-red-700">
                    <Trash2 size={18} />
                </button>
                {/* <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Eye size={18} />
                </button> */}
                {/* <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <PackagePlus size={18} />
                </button> */}
                <AddStock productId={productId} />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden w-full justify-center max-sm:flex">
                    <button className="w-fit rounded-md bg-gray-100 p-2">
                        <Settings2 size={18} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer font-medium">
                            View
                            <DropdownMenuShortcut>
                                <Eye />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <Link href={`/dashboard/products/edit/${productId}`}>
                            <DropdownMenuItem className="cursor-pointer font-medium">
                                Edit
                                <DropdownMenuShortcut>
                                    <Pencil />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => handleDelete()}
                            className="cursor-pointer bg-red-200 font-medium text-red-700 hover:bg-red-200 hover:text-red-700 focus:bg-red-200 focus:text-red-700">
                            Delete
                            <DropdownMenuShortcut>
                                <Trash2 className="text-red-700" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Actions;
