import { combineReducers, createStore } from "redux"
import { Product } from "../models/index"
import ordersReducer from "../reducers/Orders";
import productsReducer from "../reducers/products";

export const reducer = combineReducers({
    products: productsReducer,
    orders:ordersReducer,
})

export type State = ReturnType<typeof reducer>;

export const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)