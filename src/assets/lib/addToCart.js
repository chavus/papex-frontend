export default function addToCart(productData, shoppingCart){
    //Check if product business is in cart
    let shoppingCartTemp = [...shoppingCart]
    const businessIdx = shoppingCart.findIndex( bizCart => bizCart.business == productData.business._id)
    if (businessIdx == -1) {
      //Inicializa biz
      const cart = {
                    business: productData.business._id,
                    products:[{ product: productData._id,  qty:1 }],
                    comments: "",
                    deliveryMethod:"Pickup"
                  }
      shoppingCartTemp.push(cart)
    }else{
      const productIdx = shoppingCart[businessIdx].products.findIndex( product => product.product == productData._id)
      if (productIdx == -1){
        // No product, add
        shoppingCartTemp[businessIdx].products.push({product:productData._id, qty:1})
      }else{
        // Add 1 to the qty
        shoppingCartTemp[businessIdx].products[productIdx].qty += 1
      }
    }
    return shoppingCartTemp
}