import { AnyAction } from "redux"
import { LOAD_PRODUCTS, ORDERS_LOADED, ORDER_DETAIL_LOADED, PRODUCTS_LOADED } from "../actions"
import { Product } from "../models"
import {produce} from "immer"
import {schema,normalize} from "normalizr"

export type NormalizedProducts = {
    [id:number]:Product
}

export type State = {
    loading:boolean,
    products:NormalizedProducts
}

const initialState:State = {
    loading:false,
    products:{}
}

function productsReducer(currentState:State=initialState,action:AnyAction){
    switch(action.type){
        case LOAD_PRODUCTS:
            return produce(currentState,(draft)=>{
                draft.loading=true;
            })
        case PRODUCTS_LOADED:
            return produce(currentState,(draft)=>{
                draft.loading=false;
                const products = action.payload;
                const normalizedProducts = products.reduce((previous:NormalizedProducts,current:Product)=>{
                    return {...previous,[current.id]:current}
                },{})
                draft.products=normalizedProducts;
            })

        case ORDERS_LOADED:
            return produce(currentState,(draft)=>{
                draft.loading=false;
                const orders = action.payload;
                const products = orders.reduce((previous:Product[],current:any)=>{
                    return [...previous,...current.products]
                },[])

                const normalizedProducts = products.reduce((previous:NormalizedProducts,current:Product)=>{
                    return {...previous,[current.id]:current}
                },{})
                draft.products=normalizedProducts;
            })

        case ORDER_DETAIL_LOADED:
            return produce(currentState,(draft)=>{
                const order = action.payload;
                const productEntity = new schema.Entity("products");

                const data = normalize(order.prodcuts,[productEntity])

                draft.products = {...draft.products, ...data.entities.products}

            })

        default:
            return currentState;
    }
}

export default productsReducer