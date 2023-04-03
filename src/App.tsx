import { getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

import './App.css'
import { Counter } from './features/counter/Counter'
import { db,app } from './firebase/firebase'
import logo from './logo.svg'
import { useGetDocsListQuery } from './services/docs'
import { useGetProductQuery, useGetProductsQuery } from './services/products/products'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useSignInMutation, useSignInWithGoogleMutation, useSignUpMutation } from './services/auth/auth'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import ProductCard from './components/ProductCard'
import { Product, Status } from './services/products/types'
import NavBar from './components/NavBar'
import HomeLayOut from './components/layouts/HomeLayOut'

const provider = new GoogleAuthProvider();
interface User {
  displayName: string,
  photoURL: string
}

const auth = getAuth();
const App: React.FC = () => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'App.tsx');
  const [file, setFile] = useState();
  const [signUpWithPassword, status] = useSignInMutation();
  const [percent, setPercent] = useState(0);
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
    }

    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    ); 
  }
  let p: Product = {
    id: "1",
    title: "Iphone 13 pro max",
    price: 100,
    description: "test",
    image: "https://media.istockphoto.com/id/172417586/photo/elegant-black-leather-shoes.jpg?s=612x612&w=0&k=20&c=c_tTljwbu2m0AGxwb27NxCgG0Y2Cv-C4v8q6V36RYbw=",
    category: {
      id: "1",
      name: "test"
    },
    status: Status.NEW
  }
  let p2: Product = {
    id: "1",
    title: "Iphone 15 pro max",
    price: 100,
    description: "test",
    image: "https://media.istockphoto.com/id/172417586/photo/elegant-black-leather-shoes.jpg?s=612x612&w=0&k=20&c=c_tTljwbu2m0AGxwb27NxCgG0Y2Cv-C4v8q6V36RYbw=",
    category: {
      id: "1",
      name: "test"
    },
    status: Status.NEW
  }
  //const [signInWithGoogle, status] = useSignInWithGoogleMutation()
  return (
    <HomeLayOut/>
  )
}

export default App
