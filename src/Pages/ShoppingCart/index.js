import './style.scss'
import CartPerBusiness from '../../Components/CartPerBusiness'
import cartTestData from './cartTestData'

export default function ShoppingCart(){

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
            </div>
        </div>
    )
}