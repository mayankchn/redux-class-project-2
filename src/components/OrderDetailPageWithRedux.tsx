import { connect } from "react-redux";
import { orderDetailLoadedAction } from "../actions";
import { ordersMapSelector, ordersProductsSelector } from "../selectors/orders";
import { State } from "../store";
import OrderDetailPage, { OrderDetailPageProps } from "./OrderDetailPage";

function mapStateToProps(state: State,ownProps:Partial<OrderDetailPageProps>) {
    const id:number = ownProps.id!;
    return {
        order: ordersMapSelector(state)[id],
        products: ordersProductsSelector(state)[id],
    }
}

const mapDispatchToProps = {
    orderDetailLoaded: orderDetailLoadedAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage);