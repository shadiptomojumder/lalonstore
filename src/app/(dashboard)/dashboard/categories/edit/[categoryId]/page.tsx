"use client";
import GetCategoryById from "@/api/categories/getCategoryById";
import UpdateCategory from "@/api/categories/updateCategory";
import CategoriesImageSelector from "@/components/dashboardComponents/categories-image-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormData, categorySchema } from "@/interfaces/category.schemas";
import { ImageFile } from "@/interfaces/common.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PackagePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryEditPage = () => {
    const [image, setImage] = useState<ImageFile | null>(null);
    const [initialImage, setInitialImage] = useState<string | null>(null);
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const params = useParams(); // Get URL parameters

    const { categoryId } = params;

    console.log("The categoryid is:", categoryId);

    const { data: category } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => GetCategoryById({ categoryId: categoryId as string }),
    });

    // console.log("The category is:", category);

    const {
        register,
        handleSubmit,
        formState: { errors,isDirty },
        reset,
        setValue
    } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

    useEffect(() => {
        if (category) {
            if (category.thumbnail) {
                setImage({
                    id: category.thumbnail,
                    file: new File([], category.thumbnail),
                    preview: category.thumbnail,
                    name: category.thumbnail,
                    type: "image/png",
                });
                setInitialImage(category.thumbnail);
            }
            setValue("title", category.title);
        }
    }, [category,setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: UpdateCategory,
        onSuccess: (response) => {
            // console.log("The Response was:", response);
            // console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Category successfully updated");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                reset();
                setImage(null);
                setInitialImage(null);
                setIsImageChanged(false);
                router.push("/dashboard/categories");
            }
        },
        onError: (error: {
            response?: { status: number };
            request?: XMLHttpRequest;
            message?: string;
        }) => {
            if (error?.response?.status == 409) {
                toast.warning("Product already created!!");
            } else if (error?.response?.status == 400) {
                toast.warning("Please fill all the required fields!");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.error("Error while sending the request:", error.message);
            }
        },
    });

    console.log("isDirty:", isDirty);
    console.log("isImageChanged:", isImageChanged);
    console.log("isPending:", isPending);
    

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        const formData = new FormData();

        // Append text fields
        if (data.title !== category?.title) {
            formData.append("title", data.title);
        }

        // Append image file only if it has changed
        if (image && image.preview !== initialImage as string) {
            console.log("Image has changed, appending to FormData");
            formData.append("thumbnail", image.file);
        }

        if (categoryId) {
            mutate({ categoryId: categoryId as string, data: formData });
        } else {
            console.error("Category ID is undefined");
        }
    };
    return (
        <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <div>
                <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                    <div>
                        <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                            <PackagePlus />
                            Edit Product Category
                        </h2>
                        <p className="text-start text-sm sm:text-left">
                            Select your image and suitable name for product and click create button.
                        </p>
                    </div>
                    {/* <Button type="submit" size="lg" disabled={isPending}>
                        {isPending ? (
                            <>
                                <LoaderCircle className="animate-spin" /> Submiting
                            </>
                        ) : (
                            <>Save & Publish</>
                        )}
                    </Button> */}
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

                                    <CategoriesImageSelector image={image} setImage={setImage} setIsImageChanged={setIsImageChanged} />

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

                        <Button type="submit" size="lg" disabled={(!isDirty && !isImageChanged) || isPending} className="">
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

export default CategoryEditPage;
