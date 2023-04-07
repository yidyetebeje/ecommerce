import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { tab } from "@testing-library/user-event/dist/types/convenience";
import { arrayUnion, doc, getDoc, getDocs, setDoc, collection, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { setProducts } from "../../features/Products/productSlice";

import { db } from "../../firebase/firebase";
import { store } from "../../store";
import { Category } from "./types";
import { Product } from "./types";


export const productsApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Products'],
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
                    console.log(products, "products firebase")
                    store.dispatch(setProducts(products));
                    return { data: products };
                } catch (error: any) {
                    console.log(error.message);
                    return { error: error.message };
                }
            },
            providesTags: ['Products']
        }),
        getProduct: builder.query<Product,string>({
            async queryFn(id: string): Promise<{ data: Product; error?: undefined; } | { error: any; data?: undefined; }> {
                try {
                    const ref = doc(db, 'products', id);
                    const docSnapShot = await getDoc(ref);
                    const product = await docSnapShot.data();
                    const category = await getDoc(doc(db, 'categories', product?.category));
                    let c = await category.data();
                    const postedBy = await getDoc(doc(db, 'users', product?.postedBy));
                    let p = {
                        id: postedBy.id,
                        ...postedBy.data()
                    }
                    return { data: { id: docSnapShot.id, ...product, category: c?.category, postedBy: p.email } };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Products']
        }),
        getProductsByPostedBy: builder.query<Product[], string>({
            async queryFn(id: string) {
                try {
                    const ref = collection(db, 'products');
                    const querySnapShot = await getDocs(ref);
                    let products: Product[] = [];
                    querySnapShot?.forEach((doc) => {
                        if (doc.data().postedBy === id) {
                            products.push({
                                id: doc.id,
                                ...doc.data()
                            } as Product)
                        }
                    })
                    return { data: products };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Products']
        }),
        getCategories: builder.query<Category[], void>({
            async queryFn() {
                try {
                    const ref = collection(db, 'categories');
                    const querySnapShot = await getDocs(ref);
                    let categories: Category[] = [];
                    querySnapShot?.forEach((doc) => {
                        categories.push({
                            id: doc.id,
                            category: doc.data().category,
                        })
                    }
                    )
                    return { data: categories };
                } catch (error: any) {
                    return { error: error.message };
                }
            }
        }),
        postProduct: builder.mutation<Product, Product>({
            async queryFn(product:Product) {
                try {
                    const ref = collection(db, 'products');
                    const docRef = await addDoc(ref, product);
                    return { data: { id: docRef.id } };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Products']
        }),
        removeProduct: builder.mutation<Product, string>({
            async queryFn(id: string) {
                try {
                    const ref = doc(db, 'products', id);
                    await deleteDoc(ref);
                    return { data: {} as Product };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Products']
        }),
    }),
    reducerPath: 'productsApi',
});
export const {useRemoveProductMutation, useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, usePostProductMutation, useGetProductsByPostedByQuery } = productsApi;
