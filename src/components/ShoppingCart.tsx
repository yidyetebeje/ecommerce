import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../features/ShoppingCart/ShoppingCartSlice";
import { RootState } from "../store";
import CartProduct from "./CartProduct";
import ShoppingCartFooter from "./ShoppingCartFooter";

export default function ShoppingCartComp() {
    const cart = useSelector((state: RootState) => state.shoppingCart.items);
    const modalState = useSelector((state: RootState) => state.shoppingCart.modalState);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const toggleModal = () => {
        dispatch(toggleModalState(!modalState));
    }
    useEffect(() => {
        let totalPrice = cart?.reduce((acc, item) => {
            return acc + item.product.price * item.amount;
        }, 0);
        setTotal(totalPrice ? totalPrice : 0);
    }, [cart])
    return (
        <div
            className={`relative z-10  ${ modalState ? "block" : "hidden" }`}
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2
                                            className="text-lg font-medium text-gray-900"
                                            id="slide-over-title"
                                        >
                                            Inside your Cart
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                onClick={toggleModal}
                                                type="button"
                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul
                                                role="list"
                                                className="-my-6 divide-y divide-gray-200"
                                            >
                                                {cart?.map((item) => (
                                                    <li key={item.product.id} className="py-6 ">
                                                        <CartProduct cartItem={item} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <ShoppingCartFooter total={total} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}