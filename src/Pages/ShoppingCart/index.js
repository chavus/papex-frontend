import './style.scss'
import { useContext } from 'react'
import CartPerBusiness from '../../Components/CartPerBusiness'
import cartTestData from './cartTestData'
import{
    Button

} from 'reactstrap'
import { ShoppingCartContext } from '../../App'

export default function ShoppingCart(){
    const [shoppingCart, changeShoppingCart] = useContext(ShoppingCartContext)
    console.log(shoppingCart)

    console.log(cartTestData)
    return(
        <div className="container-fluid bg-p-light-gray main-padding">
            <h1 className="p-titles">Mi Carrito</h1>
            <div className="container p-borders">
            {
                cartTestData.map(cartPerBusinessData=>{
                    return <CartPerBusiness
                            cartPerBusinessData = {cartPerBusinessData}
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