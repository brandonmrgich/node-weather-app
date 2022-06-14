const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=84488be5d7bae41f6e7449c078a46447&query=' + encodeURIComponent(address) 

    request({ url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.data === undefined || body.data.length === 0) {
            callback('Unable to find location. Try another.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}
module.exports = geocode