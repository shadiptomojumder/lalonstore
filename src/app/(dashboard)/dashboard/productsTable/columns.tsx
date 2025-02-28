import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/interfaces/product.schemas";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FileImage } from "lucide-react";
import Image from "next/image";
import takaIcon from "../../../../../public/icons/taka.png";
import Actions from "./actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "images",
        accessorKey: "images",
        header: () => <div className="text-nowrap"> Image</div>,
        cell: ({ row }) => {
            const images = row.getValue("images");
            const firstImage = Array.isArray(images) && images.length > 0 ? images[0] : null;
            return (
                <div className="">
                    {firstImage ? (
                        <Image
                            src={firstImage}
                            alt="thumbnail"
                            width={60}
                            height={60}
                            className="min-h-[60px] min-w-[60px]"
                        />
                    ) : (
                        <div className="flex min-h-[60px] w-[60px] min-w-[60px] items-center justify-center bg-slate-200">
                            <FileImage />
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="line-clamp-2 w-fit max-w-[450px] min-w-[200px] text-sm capitalize">
                                {row.getValue("name")}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>{row.getValue("name")}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        // here i have an different approch to do filtering
        id: "category",
        accessorKey: "category.value",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ row }) => {
            const category = row.original.category; // Access full category object
            return (
                <div className="w-fit text-base text-nowrap capitalize">
                    <Badge variant="primary" className="">
                        {category?.title}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const categoryValue = row.getValue(id); // This is already a string
            return value.includes(categoryValue); // Compare directly
        },
    },
    {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-0.5 capitalize">
                    <Image
                        src={takaIcon}
                        alt="Taka Icon"
                        width={50}
                        height={50}
                        className="h-[15px] w-[15px]"
                    />

                    {row.getValue("price")}
                </div>
            );
        },
    },
    {
        id: "finalPrice",
        accessorKey: "finalPrice",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Final Price" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-0.5 capitalize">
                    <Image
                        src={takaIcon}
                        alt="Taka Icon"
                        width={50}
                        height={50}
                        className="h-[15px] w-[15px]"
                    />

                    {row.getValue("finalPrice")}
                </div>
            );
        },
    },

    {
        id: "stock",
        accessorKey: "stock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
        cell: ({ row }) => {
            const stock = row.getValue<number>("stock");
            return (
                <div className="text-base text-nowrap">
                    {stock === 0 ? (
                        <Badge variant="red">Out of Stock</Badge>
                    ) : (
                        <Badge variant="green" className="">
                            {stock} in Stock
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div className="capitalize">{format(date, "dd MMMM yy")}</div>;
        },
    },
    {
        id: "id",
        accessorKey: "id",
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
            const productId = row.getValue("id");
            //console.log("productId", productId);

            return <Actions productId={productId as string} />;
        },
    },

    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const product = row.original;
    //         // console.log("Apointment", apoointment);

    //         return <ActionButton product={product} />;
    //     },
    // },
];
