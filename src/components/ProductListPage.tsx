import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadProductsAction, productsLoadedAction } from "../actions"
import {useSelector} from "react-redux"
import Loading from "./Loading"
import { productsLoadingSelector, productsSelector } from "../selectors/products"

type ProductListPageProps = {}

const ProductListPage = (props:ProductListPageProps) => {
    const dispatch = useDispatch()

    const loading = useSelector(productsLoadingSelector)
    console.log('loading is ',loading)
    const products = useSelector(productsSelector)

    useEffect(()=>{
        dispatch(loadProductsAction())
        axios.get("https://dummyjson.com/products/").then((response)=>{
            dispatch(productsLoadedAction(response.data.products))
        })
    },[])

    if(loading){
        return <Loading />
    }

    return (
        <div className="flex flex-col">
            {products.map((product,i)=>{
                return (
                    <div className="text-green-500" key={i}>title : <span className="font-bold">{product.title}</span></div>
                )
            })}
        </div>
    )
}
export default ProductListPage