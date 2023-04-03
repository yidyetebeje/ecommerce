export interface Product {
    id: string,
    title: string,
    price: number,
    category: Category,
    description: string,
    image: string,
    status: Status,
}
interface Category {
    id: string,
    name: string,
}
export enum Status {
    NEW,
    USED,
}