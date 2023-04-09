export default function Input({ type, label, placeholder, value, onChange, error, success }: { type?: string; label?: string; placeholder?: string; value?: string; onChange?: any; error?: string; success?: string; }) {
    return (
        <div>
            <label htmlFor={label} className={`
            block mb-2 text-sm font-medium
            ${error ? 'text-red-500' : 'text-gray-900 dark:text-white' }`}>{error ? error : label}*</label>
            <input type={type} name={label} id={label} value={value}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 block w-full p-2.5
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                ${error ? 'dark:focus:ring-red-500 dark:focus:border-red-500  focus:ring-red-600  focus:border-red-600 border-red-600' : 'dark:focus:ring-primary-500 dark:focus:border-primary-500  focus:ring-primary-600  focus:border-primary-600'}`} placeholder={placeholder} onChange={(e) => onChange(e.currentTarget.value)}  />
        </div>
    )
}