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
import Login from './components/LoginPage'
import RegisterComp from './components/RegisterComp'
import CreateProduct from './components/CreateProduct'

const provider = new GoogleAuthProvider();
interface User {
  displayName: string,
  photoURL: string
}

const auth = getAuth();
const App: React.FC = () => {
  return (
   <CreateProduct/>
  )
}

export default App
