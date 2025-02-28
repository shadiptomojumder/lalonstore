import { api } from "../api"


const GetCategoryById = async ({categoryId}:{categoryId:string}) => {
    try {
        const response = await api.get(`/categories/${categoryId}`);
        //console.log("response in GetCategoryById list file: ", response);
        
        return response.data.data
    } catch (error) {
        console.log("The Error in GetCategoryById list api is:",error);
        
        throw error
    }
}

export default GetCategoryById;