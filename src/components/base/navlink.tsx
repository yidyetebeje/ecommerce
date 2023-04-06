import { isPending } from "@reduxjs/toolkit";
import { ReactComponentElement } from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavLink({ to, name, SVG, onClick }: {to: string, name: string, SVG:React.FC, onClick?: () => void}) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive, isPending }) => isActive ? "flex items-center rounded-lg p-2 dark:text-gray-900 hover:bg-gray-100 bg-primary-600 text-white dark:hover:bg-gray-700" :  "flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"}
        >
            <SVG/>
            <span className="ml-3">{name}</span>
        </NavLink>
    )
}