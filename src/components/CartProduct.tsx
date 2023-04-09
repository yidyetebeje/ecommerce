import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { items, removeToCart } from "../features/ShoppingCart/ShoppingCartSlice";
import { RootState } from "../store";
import Counter from "./Counter";

export default function CartProduct({ cartItem }: { cartItem: items }) {
    const { product, amount } = cartItem;
    const { title, price, image } = product;
    const dispatch = useDispatch();
    
    const removeItem = () => {
        dispatch(removeToCart(product?.id ? product?.id : ""));
    }
    return (
        <div className="flex">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    className="h-full w-full object-cover object-center"/>
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link
                                to={`/products/${product.id}`}
                            >{title}</Link>
                        </h3>
                        <p className="ml-4">{Intl.NumberFormat().format(price)}<span className=" text-sm text-gray-400">ETB</span></p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div>
                        <p className="mb-1 text-center">Quantity</p>
                        <Counter value={amount} id={product.id ? product.id : ""} />
                    </div>
                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={removeItem}
                        >Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}