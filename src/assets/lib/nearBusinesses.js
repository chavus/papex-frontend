import api from '../lib/api'

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

export default async function getNearBusinesses(userData){

    if (userData){
        console.log('yes, you are logged in as', userData.name)
        console.log('this is your id', userData._id)
        const by = "userId"
        const dataUsr = userData._id
        const radius = 3
        const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
        console.log("si fui a buscar negocios cercanos: ", arrayBusiness)
        return arrayBusiness
    }else{
        const position = await getPosition()
        const by = "userCoord"
        const dataUsr = `${position.coords.latitude},${position.coords.longitude}`
        const radius = 3
        const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
        return arrayBusiness
    }
}