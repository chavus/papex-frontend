const BASE_URL = "http://localhost:8080"

export default{

    async getAllUsers(){
        let result = await fetch(`${BASE_URL}/users`)
        const resJson = await result.json()
        return resJson.data
    }


}
