const axios = require('axios'),
    clima = require('../clima/clima');


const getLugarLatLng = async(direccion) => {
    try {
        let encodedUrl = encodeURI(direccion);

        let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`)

        if (resp.data.status === 'ZERO_RESULTS') {
            throw new Error(`No hay resultados para ${direccion}`)
        }
        let location = resp.data.results[0],
            cordenadas = location.geometry.location;

        console.log(`Direccion: ${location.formatted_address}`);
        console.log(`cordenadas: lat:${cordenadas.lat}, lng:${cordenadas.lng}`)
        clima.getClima(cordenadas.lat, cordenadas.lng);
        return {
            direccion: location.formatted_address,
            lat: cordenadas.lat,
            lng: cordenadas.lng
        }

    } catch (error) {
        console.log(`No se pudo determinar el clima en ${direccion}`);
    }
}

module.exports = {
    getLugarLatLng
}