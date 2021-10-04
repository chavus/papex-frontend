const BASE_URL = "http://localhost:8080"

export default{

    async authenticate(data){    
        let result = await fetch(`${BASE_URL}/auth/login`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'            },
            body: JSON.stringify(data)
        })
        return await result.json()
    },

    async getUserById(id, jwtToken){

        let result = await fetch(`${BASE_URL}/users/${id}`,{
            headers:{
                'Authorization': jwtToken
            }
        })
        const resJson = await result.json()
        return resJson
    },

    async createUser(data){

        let response = await fetch(`${BASE_URL}/users`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        const resJson = await response.json()
        return resJson
    },

    
    async getAllProductsByBusiness(id){
        let result = await fetch(`${BASE_URL}/products?businessId=${id}`)
        const resJson = await result.json()
        return resJson
    },

    async getAllProductsBySearch(someName){
        let result = await fetch(`${BASE_URL}/products?searchText=${someName}`)

        const resJson = await result.json()
        return resJson
    },

    async createProduct(data, jwtToken){
          
        let response = await fetch(`${BASE_URL}/products`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            },
            body: JSON.stringify(data)
        })
        const resJson = await response.json()
        return resJson

    } ,
   
    async getProductById(id){

        let result = await fetch(`${BASE_URL}/products/${id}`,{
        })
        const resJson = await result.json()
        return resJson
    }, 
    
    async deleteProductById(id, jwtToken){

        let result = await fetch(`${BASE_URL}/products/${id}`,{
            method: "DELETE",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            }
            
        })
        const resJson = await result.json()
        return resJson
    },  

     async patchProductById(id, data, jwtToken){

        let result = await fetch(`${BASE_URL}/products/${id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            },
            body: JSON.stringify(data)
            
        })
        const resJson = await result.json()
        return resJson
    },   
    async getAllUsers(){
        let result = await fetch(`${BASE_URL}/users`)
        const resJson = await result.json()
        return resJson.data
    },

    async getNearBusiness(by, data, radius){
        console.log(`${BASE_URL}/users/getNearBusinesses?by=${by}&byData=${data}&radius=${radius}`)
        let result = await fetch(`${BASE_URL}/users/getNearBusinesses?by=${by}&byData=${data}&radius=${radius}`)
        const resJson = await result.json()
        return resJson.data
    },
    
    async createOrders(data, jwtToken){
        const response = await fetch(`${BASE_URL}/orders/siblingsOrders`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            },
            body: JSON.stringify(data)
        })
        const resJson = await response.json()
        return resJson
    },
    async getAllOrders(){
       let result = await fetch(`${BASE_URL}/orders`)
       const resJson = await result.json()
       return resJson.data
   },

    async createCheckoutSession(total, jwtToken){
        const response = await fetch(`${BASE_URL}/orders/create-checkout-session`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            },
            body: JSON.stringify({total, domain: `${window.location.origin}/checkout`})
            })
            const resJson = await response.json()
            return resJson
    },
    async patchOrderById(id, data, jwtToken){

        let result = await fetch(`${BASE_URL}/orders/${id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json'
                ,'Authorization': jwtToken
            },
            body: JSON.stringify(data)
            
        })
        const resJson = await result.json()
        return resJson
    }          
}