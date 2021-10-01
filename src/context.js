export async function addToShoppingCart(productId){
    let shoppingCartTemp = [...shoppingCart]
    const res = await api.getProductById(productId)
    const productData = res.data
    //Check if product business is in cart
    const businessIdx = shoppingCart.findIndex( bizCart => bizCart.business == productData.business._id)
    if (businessIdx == -1) {
      //Initializa biz
      const cart = {
                    business: productData.business._id,
                    products:[{ product: productData._id,  qty:1 }],
                    comments: "",
                    deliveryMethod:"Pickup"
                  }
      shoppingCartTemp.push(cart)
    }else{
      const productIdx = shoppingCart[businessIdx].products.findIndex( product => product.product == productId)
      if (productIdx == -1){
        // No product, add
        shoppingCartTemp[businessIdx].products.push({product:productId, qty:1})
      }else{
        // Add 1 to the qty
        shoppingCartTemp[businessIdx].products[productIdx].qty += 1
      }
    }
    setShoppingCart(shoppingCartTemp)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartTemp))
  }

