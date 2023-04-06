import { Category } from "../../services/products/types";

export default function Select({category, setCategory, data, isLoading}: {category: string, setCategory: any, data: any, isLoading: boolean}) {
    return (
        <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={category} onChange={(e) => setCategory(e.target.value)}
            >
                <option selected={true} value="all">Select category</option>
                {
                    isLoading ? "loading" : data?.map(
                        (cat: Category) => <option value={cat.id} >{cat.category}</option>
                    )
                }
            </select>
        </div>
    )
}