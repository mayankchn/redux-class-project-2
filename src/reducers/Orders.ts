import { Action, LOAD_ORDERS, ORDERS_LOADED, ORDER_DETAIL_LOADED } from "../actions"
import { Order } from "../models"
import { produce } from "immer"
import { schema, normalize } from "normalizr"

type NormalizedOrder = { [id: number]: Order }

export type State = {
    loading: boolean,
    orders: NormalizedOrder,
    // orders_products: { [orderId: number]: number[] }
}

const initialState: State = {
    loading: false,
    orders: {},
    // orders_products: {},
}

function ordersReducer(currentState: State = initialState, action: Action) {
    switch (action.type) {
        case LOAD_ORDERS:
            return produce(currentState, (draft) => {
                draft.loading = true;
            })
        case ORDERS_LOADED:
            return produce(currentState, (draft) => {
                const ordersArr = action.payload;

                const productEntity = new schema.Entity("products");
                const orderEntity = new schema.Entity("orders", {
                    products: [productEntity],
                });

                const data = normalize(ordersArr, [orderEntity])

                draft.orders = data.entities.orders!;
                draft.loading = false;
            })

        case ORDER_DETAIL_LOADED:
            return produce(currentState, (draft) => {
                const order = action.payload;

                const productEntity = new schema.Entity("products");
                const orderEntity = new schema.Entity("orders", {
                    products: [productEntity],
                });

                const data = normalize(order, orderEntity)

                draft.orders[order.id] = data.entities.orders![order.id];
            })
        default:
            return currentState;
    }
}

export default ordersReducer