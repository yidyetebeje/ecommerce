import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilterInterface, filterProducts } from "../features/Products/productSlice";
import RadioGroup from "./base/RadioGroup";

export default function ProductFilterByStatus() {
    const options = [
        { value: "all", label: "All" },
        { value: "new", label: "New" },
        { value: "used", label: "Used" },
        
    ];
    const [value, setValue] = useState("all");
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    //debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(filterProducts({ status: value }));
        }, 500);
        return () => clearTimeout(timer);
    }, [value]);
    return (
        <div className="flex flex-col ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <RadioGroup name="status" options={options} value={value} onChange={handleChange} />
        </div>      
    )
}