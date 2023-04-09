
export default function SideBarButton({name, SVG, onClick }: { name: string, SVG: React.FC, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={"flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"}
        >
            <SVG />
            <span className="ml-3">{name}</span>
        </button>
    )
}