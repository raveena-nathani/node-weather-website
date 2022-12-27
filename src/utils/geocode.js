const request = require('request');


const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=dad1c19799d8d45259e779815b085a76&query=${address}&limit=1`

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        else if (body.data.length === 0 || body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } 
        else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name
            })
        }
    })
}

module.exports = geocode