"use client";
import CreateCategory from "@/api/categories/createCategory";
import CategoriesImageSelector from "@/components/dashboardComponents/categories-image-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormData, categorySchema } from "@/interfaces/category.schemas";
import { ImageFile } from "@/interfaces/common.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, PackagePlus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const BannersCreatePage = () => {
    const [image, setImage] = useState<ImageFile | null>(null);
    console.log("The images are form file:", image);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: (response) => {
            console.log("The Response was:", response);
            console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Category successfully created");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                reset();
                setImage(null);
            }
        },
        onError: (error: AxiosError) => {
            console.log("The Create Category Error is: ", error);
            
            if (error?.response?.status == 409) {
                toast.warning("Category already created!!");
            } else if (error?.response?.status == 400) {
                toast.warning("Please fill all the required fields!");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.error("Error while sending the request:", error.message);
            }
        },
    });

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        const formData = new FormData();

        // Append text fields
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key as keyof typeof data]);
        });

        // Append image files (assuming single image upload)
        if (image) {
            formData.append("thumbnail", image.file); // Only append the first image
        }

        console.log("The data is: ", data);
        console.log("The categoryData data is: ", formData);

        mutate(formData);
    };
    return (
        <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <div>
                <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                    <div>
                        <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                            <PackagePlus />
                            Create New Banners
                        </h2>
                        <p className="text-start text-sm sm:text-left">
                            Select your image and suitable name Banners.
                        </p>
                    </div>
                </div>
                <section className="">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <section className="mb-5 flex flex-col justify-between gap-5 lg:flex-row">
                            <section className="col-span-7 rounded-lg border-2 bg-gray-100 pb-5 lg:w-[80%]">
                                <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                                    General information
                                </h2>
                                <div className="px-5">
                                    <Label htmlFor="title" className="text-base font-semibold">
                                        Category Title <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        {...register("title")}
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Enter Product Name"
                                        className="mt-2 h-11"
                                    />

                                    <div className="h-5">
                                        {errors.title && (
                                            <span className="text-xs text-red-500">
                                                {errors.title.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <section className="col-span-4 h-fit rounded-lg border-2 bg-gray-100 lg:w-[600px] lg:max-w-[600px]">
                                <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                                    Media
                                </h2>
                                <div className="px-5">
                                    <Label htmlFor="picture" className="text-base font-semibold">
                                        Category Thumbnail <span className="text-red-600">*</span>
                                    </Label>

                                    <CategoriesImageSelector image={image} setImage={setImage} />

                                    <div className="h-5">
                                        {errors.thumbnail && (
                                            <span className="text-xs text-red-500">
                                                Please select a thumbnail
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </section>

                        <Button type="submit" size="lg" disabled={isPending} className="">
                            {isPending ? (
                                <>
                                    <LoaderCircle className="animate-spin" /> Submiting
                                </>
                            ) : (
                                <>Save & Publish</>
                            )}
                        </Button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default BannersCreatePage;
