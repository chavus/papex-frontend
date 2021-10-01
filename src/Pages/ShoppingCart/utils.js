import api from '../../assets/lib/api'

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

export { getExpandedShoppingCartInfo }