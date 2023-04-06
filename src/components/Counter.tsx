import { useState } from "react";
import { useDispatch } from "react-redux";

import { increment, decrement } from "../features/ShoppingCart/ShoppingCartSlice";
export default function Counter({ id, value}: { id: string, value: number }) {
    const dispatch = useDispatch();
    const inc = () => {
        dispatch(increment({
            id,
            by: 1,
        }));
    }
    const dec = () => {
        dispatch(
            decrement({
                id,
                by: 1,
            })
        );
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <button
                    disabled={value <= 1}
                    onClick={dec} className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-4 rounded-l">
                    -
                </button>
                <input type="text" className="border text-center w-12" value={value} />
                <button onClick={inc} className="bg-primary-700 hover:bg-primary-800 text-white font-bold px-4 rounded-r">
                    +
                </button>
            </div>
        </div>
    )
}