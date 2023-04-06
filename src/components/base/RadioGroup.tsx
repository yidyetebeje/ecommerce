export default function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex items-center justify-start rounded bg-gray-50 dark:bg-gray-800 flex-wrap gap-2 h-12 px-6">
      {options.map((option) => (
        <label key={option.value} className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            type="radio"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
  );
}