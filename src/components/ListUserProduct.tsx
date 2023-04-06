import { useSelector } from "react-redux"
import { useGetProductsByPostedByQuery } from "../services/products/products"
import { RootState } from "../store"
import UserProduct from "./UserProduct";

export default function ListUserProduct() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data, error, isLoading } = useGetProductsByPostedByQuery(user?.uid);
    return (
        <>
            <div class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {isLoading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {data && data.map((product) => (
                    <UserProduct key={product.id} product={product} />
                ))}
            </div>
        </>
        

    )
}