import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { arrayUnion, doc, getDoc, getDocs, setDoc, collection, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { Product } from "./types";


export const productsApi = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            async queryFn() {
                try {
                    const ref = collection(db, 'products');
                    const querySnapShot = await getDocs(ref);
                    console.log(querySnapShot);
                    let products: Product[] = [];
                    querySnapShot?.forEach((doc) => {
                        products.push({
                            id: doc.id,
                            ...doc.data()
                        } as Product) 
                    })
                    console.log(products, "data");
                    return { data: products };
                } catch (error: any) {
                    console.log(error.message);
                    return { error: error.message };
                }
            }
        }),
        getProduct: builder.query<Product,void>({
            async queryFn(args,
                { signal, dispatch, getState },
                {id}:{id:string},
                baseQuery): Promise<{ data: Product; error?: undefined; } | { error: any; data?: undefined; }> {
                try {
                    const ref = doc(db, 'products', id);
                    const docSnapShot = await getDoc(ref);
                    return { data: docSnapShot.data() as Product };
                } catch (error: any) {
                    return { error: error.message };
                }
            }
        }),
        
        
    }),
    reducerPath: 'productsApi',
});
export const { useGetProductsQuery, useGetProductQuery } = productsApi;
