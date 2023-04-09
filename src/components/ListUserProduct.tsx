import { useSelector } from "react-redux"
import { useGetProductsByPostedByQuery } from "../services/products/products"
import { RootState } from "../store"
import CustomNavLink from "./base/navlink";
import UserProduct from "./UserProduct";

export default function ListUserProduct({ isOpen, toggleModal }: { isOpen: boolean;  toggleModal: (value: boolean) => void}) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data, error, isLoading } = useGetProductsByPostedByQuery(user?.uid ? user?.uid  : "");
    let handleModal = () => {
        toggleModal(false);
    }
    return (
        <>
       
                {/* Small Modal */}
                <div
                id="defaultModal"
                tabIndex={-1}
                className={`fixed top-0 left-0 right-0 z-50 items-baseline justify-center ${isOpen ? "block" : "hidden"}  flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
                >
                    <div className="relative w-full h-full max-w-md md:h-auto ">
                    {/* Modal content */}
                    
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Product posted by you
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                                onClick={handleModal}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        {/* Modal body */}
                        {!user ? 
                            <CustomNavLink to='/login' SVG={() =>
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            }
                                name="sign in"
                            />
                        :
                            <div className="p-6 space-y-6  max-h-96 overflow-y-auto">
                                <div
                                    className="-my-6 divide-y divide-gray-200 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                   
                                    {data && data.map((product) => (
                                        <UserProduct key={product.id} product={product} />
                                    ))}
                                    {data && data.length === 0 && <div className="text-center">
                                        No product posted by you
                                    </div>}
                                    
                                </div>
                            </div>
                        }
                           
                        </div>
                    </div>
                </div>
        </>
        

    )
}