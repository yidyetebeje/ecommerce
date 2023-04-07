import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FilterInterface, filterProducts, Product } from "../../features/Products/productSlice";
import { useGetCategoriesQuery, useGetProductsQuery } from "../../services/products/products";

import { Category } from "../../services/products/types";
import { RootState } from "../../store";
import MinMaxRangeSlider from "../base/MinMaxRangeSlider";
import Select from "../base/Select";
import Spinner from "../base/Spinner";
import Filter from "../Filter";
import Login from "../LoginPage";
import NavBar from "../NavBar";
import ProductCard from "../ProductCard";
import ProductFilterByCategory from "../ProductFilterByCategory";
import ProductFilterByStatus from "../ProductFilterByStatus";
import SideBar from "../SideBar";
import SignInWithGoogle from "../SignInWithGoogle";

export default function HomeLayOut() {
  const { data: data, error, isLoading, isError } = useGetProductsQuery();
  const filteredData= useSelector((state: RootState)=> state.product.filteredProduct);
  const { data: c, error: cError, isLoading: cLoading, isError: cIsError } = useGetCategoriesQuery();
  return (
    <>
          <div className="flex justify-start gap-4 align-middle">
              <div className="flex h-24 items-center justify-start align-bottom gap-2 rounded">
                <ProductFilterByCategory isLoading={isLoading} categories={c}></ProductFilterByCategory>
              </div>
            <div className="flex h-24 items-center justify-start align-bottom gap-2 rounde">
                <ProductFilterByStatus
                  
                ></ProductFilterByStatus> 
        </div>
         </div>
      <div className="mb-4 flex items-center justify-start rounded bg-gray-50 dark:bg-gray-800 flex-wrap gap-2">
        {isLoading ? <Spinner></Spinner> : 
          <>
            {filteredData?.map((product: Product) => (
              <ProductCard product={product} />
            ))}
          </>
        }
        </div>
    </>
  );
}

