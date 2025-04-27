"use client";
import { ImageFile } from "@/interfaces/common.schemas";
import { X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useRef, useState, type ChangeEvent } from "react";
import gallery from "../../../public/icons/gallery_add.png";
import { Skeleton } from "../ui/skeleton";

interface ProductImageSelectorProps {
    images: ImageFile[];
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    setIsImageChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductImageSelector({ images, setImages,setIsImageChanged }: ProductImageSelectorProps) {
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setIsLoading(true);
            const newImages = Array.from(files).map((file) => ({
                id: URL.createObjectURL(file),
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            }));
            setImages((prevImages) => [...prevImages, ...newImages]);
            setIsLoading(false);
            if (setIsImageChanged) {
                setIsImageChanged(true);
            }
        }
    };

    const removeImage = (id: string) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((image) => image.id !== id);
            URL.revokeObjectURL(id);
            return updatedImages;
        });
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add("border-primary");
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove("border-primary");
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove("border-primary");
        const files = event.dataTransfer.files;
        if (files) {
            setIsLoading(true);
            const newImages = Array.from(files)
                .filter((file) => file.type.startsWith("image/"))
                .map((file) => ({
                    id: URL.createObjectURL(file),
                    file,
                    preview: URL.createObjectURL(file),
                    name: file.name,
                    type: file.type,
                }));
            setImages((prevImages) => [...prevImages, ...newImages]);
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full">
            {isLoading ? (
                <Skeleton className="h-32 w-[100px] rounded-lg" />
            ) : (
                <>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {images.map((image,index) => (
                                <div key={index} className="group relative">
                                    <Image
                                        src={image.preview || "/placeholder.svg"}
                                        alt="Product preview"
                                        width={100}
                                        height={100}
                                        className="h-32 w-full rounded-lg object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(image.id)}
                                        className="absolute top-1 right-1 rounded-full bg-white p-1 opacity-0 shadow-md transition-opacity group-hover:opacity-100 cursor-pointer"
                                        aria-label="Remove image">
                                        <X className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-32 col-span-4 w-full font-semibold text-primary rounded-lg bg-white flex items-center justify-center" >No image seleted</div>
                        
                    )}
                </>
            )}

            <div
                className="mt-3 cursor-pointer bg-[#d7f2dc] rounded-lg border-2 border-dashed border-gray-300 p-16 text-center transition-colors hover:border-primary"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                    aria-label="Select product images"
                />
                <p className="text-gray-600 font-semibold">
                    Click to select or drag and drop product images here
                </p>
            </div>
        </div>
    );
}
