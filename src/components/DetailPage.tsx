import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { addToCart, removeToCart } from "../features/ShoppingCart/ShoppingCartSlice";
import { useGetProductQuery } from "../services/products/products";
import { RootState } from "../store";

export default function DetailPage() {
    let { id } = useParams();
    const { data, isLoading, error } = useGetProductQuery(id);
    const cart = useSelector((state: RootState) => state.shoppingCart.items);
    const dispatch = useDispatch();
    const [isInCart, setIsInCart] = useState(false);
    useEffect(() => {
        setIsInCart(cart?.find((item) => item.product.id == id) ? true : false)
    }, [cart, id, data,isInCart]);
    const removeFormCart = () => {
        setIsInCart(false);
        dispatch(removeToCart(id));
    }
    const handleAddToCart = () => {
        setIsInCart(true);
        dispatch(addToCart(data));
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            {isLoading ? <h1>loading</h1> :
                <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
                    <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{data?.title }</h2>
                    <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">{Intl.NumberFormat().format(data?.price)} <span className=" text-base text-gray-400">ETB</span></p>
                    <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <a href={data?.image}  target="_blank">
                            <img src={data?.image} alt="Front of men&#039;s Basic Tee in black."
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </a>
                        
                    </div>
                    <dl className="mt-3">
                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{data?.description}</dd>
                    </dl>
                    <dl className="flex items-center space-x-6">
                        <div>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{data?.category}</dd>
                        </div>
                        <div>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">User</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{data?.postedBy}</dd>
                        </div>
                    </dl>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => isInCart ? removeFormCart() : handleAddToCart()}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            {isInCart ? "remove to cart" : "Add to cart"}
                        </button>
                    </div>
                </div>
            }

         
        </section>
    )
}