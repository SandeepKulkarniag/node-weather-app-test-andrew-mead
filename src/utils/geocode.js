const request = require('request')



const geocode = ((address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FuZGVlcGt1bGthcm5pYWciLCJhIjoiY2s4bHEzcGpnMDFpMDNtcWYwNGY5cjFjeSJ9.nI_8bVr9oiw2sRgok_X3uw'
    console.log(url)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Error occurred.", undefined)
            // } else if (response.body.features.length === 0) { 
            //     callback("NO location found", undefined)
        } else if (response.body.features.length == 0) {
            callback("No location found.", undefined)
        }
        else {
            const result = response.body.features[0].geometry.coordinates
            callback(undefined, {
                latitude: result[0],
                longitude: result[1]
            })
        }
    })


})


module.exports = geocode