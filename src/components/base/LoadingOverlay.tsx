import Spinner from "./Spinner";

export default function LoadingOverLay({children}) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-80 flex flex-col items-center justify-center">
            {children}
            <h1 className=" text-3xl text-black">Creating Product</h1>
        </div>
    )
}