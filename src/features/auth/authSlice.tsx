import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from '../../firebase/firebase'
import { AppDispatch, RootState, store } from '../../store'
export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
}
const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    loading: true,
};
const auth = getAuth(app);
const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        console.log(user);
        const { displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL, providerId, uid } = user;
        const userObj = {
            displayName,
            email,
            emailVerified,
            isAnonymous,
            phoneNumber,
            photoURL,
            providerId,
            uid
        }
        store.dispatch(setLoginStatus({ isLoggedIn: true, user:userObj, loading: false }));
    }
    else store.dispatch(setLoginStatus({ isLoggedIn: false, user: null, loading: false }));
});
unregisterAuthObserver();
export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setLoginStatus: (state, action: PayloadAction<AuthState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.loading = action.payload.loading;
        }
    },
})


export const { setLoginStatus } = authSlice.actions;
export default authSlice.reducer;