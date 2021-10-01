import './style.scss'
import { useContext, useEffect, useState } from 'react'
import CartPerBusiness from '../../Components/CartPerBusiness'
import cartTestData from './cartTestData'
import{
    Button

} from 'reactstrap'
import { ShoppingCartContext } from '../../App'
import { getExpandedShoppingCartInfo } from './utils'

export default function ShoppingCart(){
    const [shoppingCart, changeShoppingCart] = useContext(ShoppingCartContext)
    const [expandedShoppingCart, setExpandedShoppingCart] = useState(null)


    useEffect(async ()=>{
        const expandedShoppingCart = await getExpandedShoppingCartInfo(shoppingCart)
        setExpandedShoppingCart(expandedShoppingCart)
    }, [shoppingCart])

    function onCommentChange(event){
        const businessId = event.target.dataset.businessId
        const value = event.target.value
        let eShoppingCartTemp = [...expandedShoppingCart]
        const businessIdx = eShoppingCartTemp.findIndex(businessCart => businessCart.business._id == businessId)
        eShoppingCartTemp[businessIdx].comments = value
        setExpandedShoppingCart(eShoppingCartTemp)
    }

    function onCommentBlur(event){
        const businessId = event.target.dataset.businessId
        const value = event.target.value
        let shoppingCartTemp = [...shoppingCart]
        const businessIdx = shoppingCartTemp.findIndex(businessCart => businessCart.business == businessId)
        shoppingCartTemp[businessIdx].comments = value
        changeShoppingCart(shoppingCartTemp)
    }

    function onQtyChange(event){
        const value = event.target.value
        const { businessId, productId } = event.target.dataset
        let shoppingCartTemp = [...shoppingCart]
        const businessIdx = shoppingCartTemp.findIndex(businessCart => businessCart.business == businessId)
        const productIdx = shoppingCartTemp[businessIdx].products.findIndex(product => product.product == productId)
        shoppingCartTemp[businessIdx].products[productIdx].qty = value
        changeShoppingCart(shoppingCartTemp)
    }

    function onDeleteClick(event){
        const { businessId, productId } = event.currentTarget.dataset   
        let shoppingCartTemp = [...shoppingCart]
        const businessIdx = shoppingCartTemp.findIndex(businessCart => businessCart.business == businessId)
        const productIdx = shoppingCartTemp[businessIdx].products.findIndex(product => product.product == productId)
        console.log(shoppingCartTemp[businessIdx])
        shoppingCartTemp[businessIdx].products.splice(productIdx,1)
        changeShoppingCart(shoppingCartTemp)
    }

    function onDeliveryChange(event){
        const businessId = event.target.dataset.businessId
        const value = event.target.value
        let shoppingCartTemp = [...shoppingCart]
        const businessIdx = shoppingCartTemp.findIndex(businessCart => businessCart.business == businessId)
        shoppingCartTemp[businessIdx].deliveryMethod = value
        changeShoppingCart(shoppingCartTemp)
    }
    return(
        <div className="container-fluid bg-p-light-gray main-padding">
            <h1 className="p-titles">Mi Carrito</h1>
            <div className="container p-borders">
            { expandedShoppingCart && 
                expandedShoppingCart.map((cartPerBusinessData, idx)=>{
                    return <CartPerBusiness
                            key={idx}
                            cartPerBusinessData = {cartPerBusinessData}
                            onCommentChange = { onCommentChange }
                            onCommentBlur = { onCommentBlur }
                            onQtyChange = { onQtyChange }
                            onDeleteClick = { onDeleteClick }
                            onDeliveryChange = { onDeliveryChange }
                    />
                })
            }
            <div className="text-end mt-4">
                <div className="total mb-3"><span className="fw-bold">Total:</span> $ 1,538.00</div>
                <Button className="btn-p-primary">Hacer Checkout</Button>
            </div>
            </div>
            
        </div>
    )
}