import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import counterReducer from './features/counter/counterSlice'
import { docsApi } from './services/docs'
import { productsApi } from './services/products/products'
import shoppingCartReducer from './features/ShoppingCart/ShoppingCartSlice'
import { authApi } from './services/auth/auth'
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(docsApi.middleware, productsApi.middleware, authApi.middleware),
  reducer: {
    counter: counterReducer,
    shoppingCart: shoppingCartReducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
