import React from "react"
import ProductListPage from "./components/ProductListPage"
import {Routes,Route} from "react-router-dom"
import OrderDetailPage from "./components/OrderDetailPage"
import OrderListPage from "./components/OrderListPage"


function App() {
  return (
    <div>
    <Routes>
      <Route index element={<ProductListPage />}></Route>
      <Route path="/orders" element={<OrderListPage />}></Route>
      <Route path="/orders/:id" element={<OrderDetailPage />}></Route>
    </Routes>
    </div>
  )
}

export default App
