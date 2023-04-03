import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startTrackValue } from '@testing-library/user-event/dist/types/document/trackValue';

export interface ShoppingCartState {
    items?: items[];
}
export interface items {
    productId: string,
    amount: number,
}
export interface ModifyAmount {
    productId: string, 
    by: number,
}

const initialState: items[] = [{
    productId: 'steingjksn',
    amount: 1
}];
export const shoppingCartSlice = createSlice({
    initialState,
    name: 'shoppingCart',
    reducers: {
        addToCart: (state, action: PayloadAction<string>) => {
            let exist = state.find(item => item.productId == action.payload);
            if(exist) return state;
            state.push({
                productId: action.payload,
                amount: 1,
            })
        },
        removeToCart: (state, action: PayloadAction<string>) => {
            state = state.filter(item => item.productId !== action.payload)
            return state;
        },
        increment: (state, action: PayloadAction<ModifyAmount>) => {
            state.forEach(item => {
                if (item.productId == action.payload.productId) {
                    item.amount += action.payload.by;
                }
            })   
        },
        decrement: (state, action: PayloadAction<ModifyAmount>) => {
            state.forEach(item => {
                if (item.productId == action.payload.productId) {
                    item.amount -= action.payload.by;
                }
            })      
        }
    }
})
export const { addToCart, removeToCart, decrement, increment } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;