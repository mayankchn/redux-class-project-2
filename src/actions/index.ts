import { Order, Product } from "../models"

export const LOAD_PRODUCTS = "LOAD_PRODUCTS"
export const PRODUCTS_LOADED = "PRODUCTS_LOADED"
export const LOAD_ORDERS = "LOAD_ORDERS"
export const ORDERS_LOADED = "ORDERS_LOADED"
export const ORDER_DETAIL_LOADED = "ORDER_DETAIL_LOADED"

export type Action<T=any> = {
    type:string,
    payload?:T,
} 

export type ActionCreator<T=undefined> = (...args:any) => Action<T>

export const loadProductsAction:ActionCreator<any> = () =>{
    return {
        type:LOAD_PRODUCTS,
        payload:undefined,
    }
}

export const productsLoadedAction:ActionCreator<Product[]> = (products:Product[]) => {
    return {
        type:PRODUCTS_LOADED,
        payload:products
    }
}

export const loadOrdersAction:ActionCreator<any> = () =>{
    return {
        type:LOAD_ORDERS,
        payload:undefined,
    }
}

export const ordersLoadedAction:ActionCreator<Order[]> = (orders:Order[]) => {
    return {
        type:ORDERS_LOADED,
        payload:orders,
    }
}

export const orderDetailLoadedAction:ActionCreator<Order>=(order:Order)=>{
    return {
        type:ORDER_DETAIL_LOADED,
        payload:order,
    }
}