import api from '../../assets/lib/api'
import CartPerBusiness from '../../Components/CartPerBusiness'

async function getCartPerBusinessInfo(businessCart){
    // Expands cart info from IDs
    const res = await api.getAllProductsByBusiness(businessCart.business)
    const businessProducts = res.data
    const businessObject = businessProducts[0].business
    const productsObjects = businessCart.products.map(productItem => {
        const productObject =  businessProducts.find(product => product._id == productItem.product)
        return {...productItem, product:productObject}
    })
    return {...businessCart, business:businessObject, products:productsObjects}
}

async function getExpandedShoppingCartInfo(shoppingCart){
    const expandedShoppingCart = await Promise.all(shoppingCart.map(cartPerBusiness => {
        return getCartPerBusinessInfo(cartPerBusiness)
    }))
    return expandedShoppingCart
}

function getSubTotal(cartPerBusiness){
    const deliveryMethod = cartPerBusiness.deliveryMethod
    return cartPerBusiness.products.reduce( (subtotal, currProd) =>{
            return subtotal + currProd.product.price*currProd.qty
           },deliveryMethod == "Delivery" ? 30 : 0 )
}

function getTotal(eCart){
    return eCart.reduce( (acc, cPB) => acc + getSubTotal(cPB), 0)
}

export { getExpandedShoppingCartInfo, getTotal }