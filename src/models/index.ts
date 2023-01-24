export type Product = {
    "id": 1,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}

export type Order = {
    "id": number,
    "total": number,
    "products":number[],
    "discountedTotal": number,
    "totalProducts": number,
    "totalQuantity": number,
}

export type OrderProduct = {
    "id": number,
    "quantity": number,
    "total": number,
    "discountedPercentage": number,
    "discountedPrice": number,
}