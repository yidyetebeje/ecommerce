export interface Product {
    id?: string,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    status: Status,
    brand: string,
    stock: number,
    rating: number,
    numReviews: number,
    isFeatured?: boolean,
    postedBy?: string,
}
export interface Category {
    id: string,
    category: string,
}
export enum Status {
    NEW,
    USED,
}