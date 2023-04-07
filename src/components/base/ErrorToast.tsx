import { Toast } from "flowbite-react";

export default function ErrorToast({ message }: { message: string }) {
    return ( 
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="ml-3 text-sm font-normal">
                {message}
            </div>
            <Toast.Toggle />
        </Toast>
    )
}