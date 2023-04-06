import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../features/auth/authSlice';
import { app } from '../firebase/firebase';
export default function useAuth() {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const user = useSelector((state: any) => state.auth);
    useEffect(() => {
        const logged = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setLoginStatus({isLoggedIn: true, user}));
            } else {
                dispatch(setLoginStatus({isLoggedIn: false, user: null}));
            }
        })
        return logged;
    }, [user]);
    return (
        ''
    )
}