import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/interfaces/product.schemas";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}: {product:Product}) => {
    const { cartItems, addToCart, removeFromCart, updateCartItem, clearCart } = useCart();

    //console.log("cartItems is:", cartItems);
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        addToCart({
            id: product?.id,
            name: product?.name,
            image: product?.images[0],
            quantity: product?.quantity,
            count: 1,
            price: product?.finalPrice,
        });
    };

    const handleIncrement = () => {
        const cartItem = cartItems.find((item) => item.id === product?.id);
        if (cartItem) {
            updateCartItem(product.id, {
                ...cartItem,
                count: cartItem.count + 1,
            });
        }
    };

    const handleDecrement = () => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem && cartItem.count > 1) {
            updateCartItem(product.id, {
                ...cartItem,
                count: cartItem.count - 1,
            });
        } else if (cartItem && cartItem.count === 1) {
            removeFromCart(product.id);
        }
    };

    return (
        <section className="group relative flex w-full h-full flex-col justify-between rounded-md border bg-white p-[5px] shadow transition-all duration-300 disabled:bg-red-400 sm:p-3 md:min-w-[220px] z-50">
            <div className="relative">
                <Image
                    src={product?.images[0]}
                    alt="product"
                    width={150}
                    height={150}
                    className="mx-auto h-[100px] w-[120px] object-cover object-center md:h-[150px] md:w-[150px]"
                />

                {/* ADD TO CART BUTTON FOR MOBILE DEVICES */}
                {!isProductInCart ? (
                    <div
                        onClick={handleAddToCart}
                        className="absolute right-3 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-primary shadow-2xl min-[424px]:hidden">
                        <Plus />
                    </div>
                ) : (
                    <div className="absolute bottom-0 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between gap-1 rounded-full bg-yellow-500 text-white shadow-lg min-[424px]:hidden">
                        <button
                            onClick={handleDecrement}
                            className="w-fit p-[1px] px-3 text-gray-800">
                            <Minus />
                        </button>
                        <p className="text-base font-semibold text-gray-900">
                            {cartItems.find((item) => item.id === product.id)?.count}
                        </p>
                        <button
                            onClick={handleIncrement}
                            className="w-fit p-[1px] px-3 text-gray-800">
                            <Plus />
                        </button>
                    </div>
                )}
            </div>
            <section className="mt-3 flex h-full flex-col justify-between gap-1 min-[424px]:mt-1">
                <Link href="#">
                    <h2 className="line-clamp-2 text-center text-sm font-medium text-ellipsis text-[#1A1A1A] capitalize transition-all duration-300 hover:underline">
                        {product?.name}
                    </h2>
                </Link>
                <div className="space-y-1 text-center sm:space-y-2">
                    <p className="text-sm font-medium text-[#1A1A1A] sm:text-base">
                        {product?.quantity}
                    </p>
                    <p className="text-base font-bold text-[#1A1A1A]">৳{product?.price}</p>

                    {!isProductInCart ? (
                        <button
                            className="hidden w-full items-center justify-center gap-1 rounded-full bg-[#00B307] py-1 text-white shadow-lg min-[424px]:flex"
                            onClick={handleAddToCart}>
                            <ShoppingCart size={20} className="text-[#FFFFFF]" />
                            Add to cart
                        </button>
                    ) : (
                        <div className="hidden min-h-[32px] w-full items-center justify-around gap-1 rounded-full bg-yellow-500 text-white shadow-lg min-[424px]:flex">
                            <button
                                onClick={handleDecrement}
                                className="h-[32px] border-r-2 border-gray-600 p-[1px] pr-4 text-gray-800">
                                <Minus />
                            </button>
                            <p className="text-base font-semibold text-gray-900">
                                {cartItems.find((item) => item.id === product.id)?.count} in Bag
                            </p>
                            <button
                                onClick={handleIncrement}
                                className="h-[32px] border-l-2 border-gray-600 p-[1px] pl-4 text-gray-800">
                                <Plus />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {product?.stock === 0 && (
                <div
                    className={`absolute top-0 left-0 h-full w-full rounded-md bg-gray-100/70`}>
                    {product?.stock === 0 && (
                        <Badge className="absolute top-2 left-2 bg-yellow-400 hover:bg-yellow-400">
                            Out of stocks
                        </Badge>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductCard;
