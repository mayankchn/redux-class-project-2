import axios from "axios";
import { FC, memo, useEffect } from "react";
import { Order, Product } from "../models";
import Loading from "./Loading";

export type OrderDetailPageProps = {
    order:Order,
    products:Product[],
    orderDetailLoaded:(order:Order)=>void,
    id:number,
}

const OrderDetailPage:FC<OrderDetailPageProps> = ({order,products,orderDetailLoaded,id}) => {

    useEffect(() => {
            axios.get("https://dummyjson.com/carts/" + id).then((response) => {
                orderDetailLoaded(response.data)
            })
    }, [order])

    if (!order) {
        return <Loading />
    }

    return (
        <div className="flex flex-col gap-1">
            <div>
                <span>order id : </span>
                <span className="font-bold">{order.id}</span>
            </div>
            <div>
                <span>order total : </span>
                <span className="font-bold">{order.total}</span>
            </div>
            <div>
                <p className="font-semibold">order's having : </p>
                {products.map((product,i)=>{
                    return (
                        <div key={i}>
                            <div>
                                <span>product id : </span>
                                <span>{product.id}</span>
                            </div>
                            <div>
                                <span>product title : </span>
                                <span>{product.title}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
OrderDetailPage.defaultProps = {}

export default memo(OrderDetailPage);