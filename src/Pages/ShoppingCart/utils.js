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
    console.log(eCart)
    return eCart.reduce( (acc, cPB) => acc + getSubTotal(cPB), 0)
}

/*
ordenData: {
    parentOrder-> backend,
    confirmation_code -> backend,
    status -> backend,

    business: _Id,
    client: _Id,
    products: [
        {product:_id, price: int, qty: in}
    ],
    deliveryMethod: "Pickup",
    deliveryCost: number,
    total: number,
    comment: string
}

*/

async function createOrders(shoppingCart, clientId){
    const expandedShoppingCart = await getExpandedShoppingCartInfo(shoppingCart)
    const ordersArray = expandedShoppingCart.map( cart =>{
                                        return {
                                            business: cart.business._id,
                                            client: clientId,
                                            products: cart.products.map(product=>{ return {product: product.product._id,
                                                                                        price: product.product.price,
                                                                                        qty: product.qty}}),
                                            deliveryMethod: cart.deliveryMethod,
                                            deliveryCost: cart.deliveryMethod == "Delivery" ? 30 : 0,
                                            comment: cart.comments,
                                            total: getSubTotal(cart)
                                        }
    })
    const createdOrders = await api.createOrders(ordersArray)

    return createdOrders

}


export { getExpandedShoppingCartInfo, getTotal, createOrders }