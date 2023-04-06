import { Outlet } from "react-router";
import Filter from "../components/Filter";
import Login from "../components/LoginPage";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SideBar from "../components/SideBar";
import SignInWithGoogle from "../components/SignInWithGoogle";
import { Status } from "../services/products/types";
import { Product } from "../services/products/types";


export default function Root() {
    const p: Product[] = [
        {
            id: "1",
            title: "Iphone 15 pro max",
            price: 100,
            description: "test",
            image:
                "https://media.istockphoto.com/id/172417586/photo/elegant-black-leather-shoes.jpg?s=612x612&w=0&k=20&c=c_tTljwbu2m0AGxwb27NxCgG0Y2Cv-C4v8q6V36RYbw=",
            category: {
                id: "1",
                name: "test",
            },
            status: Status.NEW,
        },
        {
            id: "1",
            title: "Iphone 15 pro max",
            price: 100,
            description: "test",
            image:
                "https://techcrunch.com/wp-content/uploads/2022/09/Apple-iphone-14-Pro-review-1.jpeg?w=730&crop=1",
            category: {
                id: "1",
                name: "test",
            },
            status: Status.NEW,
        },
        {
            id: "1",
            title: "Iphone 15 pro max",
            price: 100,
            description: "test",
            image:
                "data:image/jpeg;base64,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",
            category: {
                id: "1",
                name: "test",
            },
            status: Status.NEW,
        },
    ];
    return (
        <>
            <NavBar />

            <SideBar />

            <div className="p-4 sm:ml-64">
                <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
                   <Outlet/>
                </div>
            </div>
        </>
    );
}

