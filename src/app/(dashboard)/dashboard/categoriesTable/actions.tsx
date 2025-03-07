import DeleteCategory from "@/api/categories/deleteCategories";
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
import { Pencil, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Actions = ({ categoryId }: { categoryId: string }) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: [],
        mutationFn: DeleteCategory,
        onSuccess: (response) => {
            console.log("the res is ", response);

            if (response.statusCode === 200) {
                toast.success("Category deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            }
        },
        onError: (error: {
            response?: { status: number };
            request?: XMLHttpRequest;
            message?: string;
        }) => {
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
        mutate({ categoryId });
    };

    return (
        <>
            <div className="hidden items-center gap-2 min-sm:flex">
                <Link
                    href={`/dashboard/categories/edit/${categoryId}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7f2dc] text-primary">
                    <Pencil size={18} />
                </Link>
                <button
                    onClick={() => handleDelete()}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-200 text-red-700">
                    <Trash2 size={18} />
                </button>
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
                            Edit
                            <DropdownMenuShortcut>
                                <Pencil />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer bg-red-200 font-medium text-red-700 hover:bg-red-200 hover:text-red-700">
                            Delete
                            <DropdownMenuShortcut>
                                <Trash2 className="text-red-700" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>
                                <Settings />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Actions;
