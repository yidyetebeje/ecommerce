import { useParams } from "react-router"
import { useGetProductQuery } from "../services/products/products";

export default function DetailPage() {
    let { id } = useParams();
    const { data, isLoading, error } = useGetProductQuery(id);

    return (
        <section className="bg-white dark:bg-gray-900">
            {isLoading ? <h1>loading</h1> :
                <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
                    <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{data?.title }</h2>
                    <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">${ data?.price}</p>
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
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Electronics/PC</dd>
                        </div>
                        <div>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Item weight</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">12kg</dd>
                        </div>
                    </dl>
                    <div className="flex items-center space-x-4">
                        <button type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                            Add To Cart
                        </button>
                    </div>
                </div>
            }

         
        </section>
    )
}