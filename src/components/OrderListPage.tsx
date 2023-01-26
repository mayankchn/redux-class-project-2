import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { loadOrdersAction, ordersLoadedAction } from "../actions";
import { ordersLoadingSelector, ordersSelector } from "../selectors/orders";
import Loading from "./Loading";

type OrderListPageProps = {}

const OrderListPage = (props:OrderListPageProps) => {
    const dispatch = useDispatch();
    const loading = useSelector(ordersLoadingSelector);
    const orders = useSelector(ordersSelector);
    useEffect(()=>{
        dispatch(loadOrdersAction())
        axios.get("https://dummyjson.com/carts").then((response)=>{
            dispatch(ordersLoadedAction(response.data.carts))
        })
    },[])

    if(loading){
        return <Loading />
    }

    return (
        <div>
            {orders.map((order,i)=>{
                return (
                    <div key={i} className="flex gap-3 flex-wrap px-2 py-1">
                        <div>
                            <span>order number : </span><Link to={"/orders/"+order.id}><span className="font-bold cursor-pointer text-indigo-700">{order.id}</span></Link>
                        </div>
                        <div>
                            <span>total products : </span><span className="font-bold">{order.totalProducts}</span>
                        </div>
                        <div>
                            <span>total quantity : </span><span className="font-bold">{order.totalQuantity}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
OrderListPage.defaultProps = {}
export default OrderListPage