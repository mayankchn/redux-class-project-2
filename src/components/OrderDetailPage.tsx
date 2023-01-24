import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { orderDetailLoaded } from "../actions";
import { ordersMapSelector, ordersProductsSelector } from "../selectors/orders";
import Loading from "./Loading";

type OrderDetailPageProps = {}

const OrderDetailPage = (props: OrderDetailPageProps) => {
    const params = useParams()
    const id = +params.id!;

    const ordersMap = useSelector(ordersMapSelector)
    const ordersProductsMap = useSelector(ordersProductsSelector)
    // console.log('orderHasProducts : ',ordersProductsMap)

    const order = ordersMap[id]
    console.log('ordre is ', order)

    const products = ordersProductsMap[id]
    console.log('products ',products)

    const dispatch = useDispatch();
    useEffect(() => {
        if (!ordersMap[id]) {
            axios.get("https://dummyjson.com/carts/" + id).then((response) => {
                dispatch(orderDetailLoaded(response.data))
                return <Loading />
            })
        }
    }, [ordersMap, id])

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

export default OrderDetailPage