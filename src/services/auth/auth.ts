import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { arrayUnion, doc, getDoc, getDocs, setDoc, collection, updateDoc } from "firebase/firestore";
import { db , app} from "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, Auth, signInWithPopup, User } from "firebase/auth";
import { store } from "../../store";
import { setLoginStatus } from "../../features/auth/authSlice";
export interface ResponseState {
    data: any;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
}
export const authApi = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        signIn: builder.mutation<any, { email: string; password: string; }>({
            async queryFn({ email, password }) {
                try {
                    const auth = getAuth(app);
                    const authenticate = await signInWithEmailAndPassword(auth, email, password);
                    const user = authenticate.user;
                    store.dispatch(setLoginStatus({ isLoggedIn: true, user, loading: false }));
                    return { data: { user } };
                }
                catch (error: any) {
                    console.log(error.message);
                    return { error: error.message as string };
                }
            }
        }),
        signUp: builder.mutation<any, { email: string; password: string }>({
            async queryFn({ email, password }): Promise<ResponseState> {
                try {
                    const auth = getAuth(app);
                    const authenticate = await createUserWithEmailAndPassword(auth, email, password);
                    const user = authenticate.user;
                    const ref = doc(db, 'users', user?.uid);
                    await setDoc(ref, {
                        email: user?.email,
                        name: user?.displayName,
                        photo: user?.photoURL,
                        cart: [],
                        wishlist: []
                    });
                    return { data: { user }, isSuccess: true, isError: false, error: null };
                }
                catch (error: any) {
                    return { error: error.message, data: null, isSuccess:false , isError: true};
                }
            }
        }),
        signInWithGoogle: builder.mutation<Promise<{ data: { user: User; token: string | undefined; }; error?: undefined; isSuccess?: undefined; } | { error: any; isSuccess: boolean; data: null; }>, void>({
            // @ts-ignore
            async queryFn() {
                try {
                    const auth = getAuth(app);
                    const provider = new GoogleAuthProvider();
                    const authenticate = await signInWithPopup(auth, provider);
                    const credential = GoogleAuthProvider.credentialFromResult(authenticate);
                    const token = credential?.accessToken;
                    const user = authenticate.user;
                    const ref = doc(db, 'users', user?.uid);
                    const docSnapShot = await getDoc(ref);
                    if (!docSnapShot.exists()) {
                        await setDoc(ref, {
                            email: user?.email,
                            name: user?.displayName,
                            photo: user?.photoURL,
                            cart: [],
                            wishlist: []
                        });
                    }
                    store.dispatch(setLoginStatus({ isLoggedIn: true, user , loading:false}));
                    return { data: { user, token }};
                } 
                catch (error: any) {
                    return {error: error.message};
                }
            }
        })
    }),
    reducerPath: 'authApi',
});
export const { useSignInMutation, useSignUpMutation, useSignInWithGoogleMutation } = authApi;

