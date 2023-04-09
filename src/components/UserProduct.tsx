import { Product } from "../services/products/types";
import { useRemoveProductMutation } from "../services/products/products";
export default function ({ product }: { product: Product }) {
    let [removeItem, status] = useRemoveProductMutation();
    const removeProduct = () => {
        removeItem(product.id as string);
    }
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={product.image}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        className="h-full w-full object-cover object-center"/>
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <a href="#">{product.title}</a>
                            </h3>
                        </div>
                        <p>{product.price}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">


                    </div>

                </div>


            </div>

            <button
                onClick={removeProduct}
                className="font-medium text-red-600 hover:text-red-500 py-1 px-4">x delete</button>

        </div>


    )
}