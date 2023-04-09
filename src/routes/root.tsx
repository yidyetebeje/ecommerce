import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SideBar from "../components/SideBar";


export default function Root() {
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

