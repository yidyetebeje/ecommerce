import { useState } from "react";

export default function MinMaxRangeSlider() {
    let [value, setValue] = useState<number>(5);
    let handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <label htmlFor="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min-max range{value}</label>
            <input id="minmax-range" type="range" min="0" max="10" value={value}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={handleChange}
            />
        </div>
    )
}