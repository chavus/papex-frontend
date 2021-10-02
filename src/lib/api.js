const BASE_URL = "http://localhost:8080"

export default{

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
    }

}
