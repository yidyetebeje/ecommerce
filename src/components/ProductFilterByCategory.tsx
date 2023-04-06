import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../features/Products/productSlice";
import Select from "./base/Select";

export default function ProductFilterByCategory({ isLoading, categories }: { isLoading:boolean,setFilterBy: (filterBy: FilterInterface) => void, filterBy: FilterInterface, categories: Category[] }) {
    const [category, setCategory] = useState("all");
    const dispatch = useDispatch();
    const handleChange = (id:string) => {
        setCategory(id);
        dispatch(filterProducts({  category: id }));
    }
    return (
        <div className="flex flex-col">
            
            <Select category={category} setCategory={handleChange} data={categories} isLoading={isLoading}/>
        </div>
    )
}