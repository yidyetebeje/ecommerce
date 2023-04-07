import { Toast } from "flowbite-react";

export default function SuccessToast() {
    return (
        
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div className="ml-3 text-sm font-normal">
                Item moved successfully.
            </div>
            <Toast.Toggle />
        </Toast>
    )
}