import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startTrackValue } from '@testing-library/user-event/dist/types/document/trackValue';
import { Product } from '../../services/products/types';

export interface ShoppingCartState {
    items?: items[];
    modalState: boolean;
}
export interface items {
    product: Product,
    amount: number,
}
export interface ModifyAmount {
    id: string, 
    by: number,
}

const initialState: ShoppingCartState = {
    items: [],
    modalState: false,
};
export const shoppingCartSlice = createSlice({
    initialState,
    name: 'shoppingCart',
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            let exist = state.items?.find(item => item.product.id === action.payload.id);
            if (!exist) {
                state.items?.push({ product: action.payload, amount: 1 });
            }
        },
        removeToCart: (state, action: PayloadAction<string>) => {
            let exist = state.items?.find(item => item.product.id === action.payload);
            if (exist) {
                state.items?.splice(state.items?.indexOf(exist), 1);
            }
        },
        increment: (state, action: PayloadAction<ModifyAmount>) => {
            state.items?.forEach(item => {
                if (item.product.id == action.payload.id) {
                    item.amount += action.payload.by;
                }
            })    
        },
        decrement: (state, action: PayloadAction<ModifyAmount>) => {
            state.items?.forEach(item => {
                if (item.product.id == action.payload.id) {
                    if (item.amount > 1) {
                        item.amount -= action.payload.by;
                    }
                }
            })     
        },
        toggleModalState: (state, action: PayloadAction<boolean>) => {
            state.modalState = action.payload;
        }
    }
})
export const { addToCart, removeToCart, decrement, increment, toggleModalState } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;