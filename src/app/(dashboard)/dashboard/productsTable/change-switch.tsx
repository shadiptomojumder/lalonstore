import updateProduct from "@/api/products/updateProduct";
import { Switch } from "@/components/ui/switch";
import { APIError } from "@/interfaces/common.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const CnangeSwitch = ({
    productId,
    fieldName,
    initialValue
}: {
    productId: string;
    fieldName: "isWeekendDeal" | "isFeatured";
    initialValue?: boolean;
}) => {
    console.log("isWeekendDeal", initialValue);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (response) => {
            console.log("The Response was:", response);
            console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Product successfully created");

                queryClient.invalidateQueries({ queryKey: ["products", "product", productId] });
                // router.push("/dashboard/products");
            }
        },
        onError: (error: APIError) => {
            console.log("The Create Product Page Error is: ", error);

            if (error.statusCode === 409) {
                toast.warning("Product already exist.");
            } else if (error.statusCode === 400) {
                toast.warning(error.message || "Please fill all the required fields!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
        },
    });

    const handleSwitchChange = (checked: boolean) => {
        console.log("The Switch was clicked:", checked);

        // mutate({ productId, data: { isWeekendDeal: checked } });
        mutate({ productId, data: { [fieldName]: checked } });
    };
    return (
        <Switch
            id="isWeekendDeal"
            name="isWeekendDeal"
            className=""
            defaultChecked={initialValue}
            disabled={isPending}
            onCheckedChange={(e) => handleSwitchChange(e)}
        />
    );
};

export default CnangeSwitch;
