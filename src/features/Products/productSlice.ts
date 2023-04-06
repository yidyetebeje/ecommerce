import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from "../../services/products/types";
import fuse from 'fuse.js';
import Fuse from 'fuse.js';

export interface Product {
    id?: string,
    title: string,
    price: number,
    category: Category,
    description: string,
    image: string,
    status: Status,
    brand: string,
    stock: number,
    rating: number,
    numReviews: number,
    isFeatured?: boolean,
    postedBy?: string,
}
export interface Category {
    id: string,
    category: string,
}

export interface ProductState {
    products: Product[];
    filteredProduct: Product[];
    filteredBy: FilterInterface;
}
export interface FilterInterface {
    category: string;
    status: string;
    price: number;
    rating: number;
    brand: string;
    search: string;
}
export const initialState: ProductState = {
    products: [],
    filteredProduct: [],
    filteredBy: {
        category: 'all',
        status: 'all',
        price: 0,
        rating: 0,
        brand: '',
        search: ''
    }
}
export const productSlice = createSlice({
    initialState,
    name: 'product',
    reducers: {
        setProducts: (state, action) => {
            state.products = [...action.payload];
            state.filteredProduct = [...action.payload];
        },
        filterProducts:(state, action) => {
            state.filteredBy = {
                ...state.filteredBy, ...action.payload
            }
            const { category, status, search } = state.filteredBy;
            let tempProducts = JSON.parse(JSON.stringify(state.products)) as Product[];

            if (category !== 'all') {
                tempProducts = tempProducts.filter((product) => product.category === category);
            }
            if (status !== 'all') {
                tempProducts = tempProducts.filter((product) => product.status === status);
            }
            if (search !== '') {
                const fuse = new Fuse(tempProducts, {
                    keys: ['title', 'description', 'brand']
                });
                tempProducts = fuse.search(search).map((item) => item.item);
            }
            state.filteredProduct = JSON.parse(JSON.stringify(tempProducts)) as Product[];
        }
    }
})

export const { setProducts, filterProducts } = productSlice.actions;
export default productSlice.reducer;