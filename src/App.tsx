import ProductListPage from "./components/ProductListPage"
import {Routes,Route} from "react-router-dom"
import OrderListPage from "./components/OrderListPage"
import OrderDetailPage from "./components/OrderDetailPageWithRedux"


function App() {
  return (
    <div>
    <Routes>
      <Route index element={<ProductListPage />}></Route>
      <Route path="/orders" element={<OrderListPage />}></Route>
      <Route path="/orders/:id" element={<OrderDetailPage id={2} />}></Route>
    </Routes>
    </div>
  )
}

export default App
