const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZG9ub3Jkb25hdGlvbjk5IiwiYSI6ImNrYmdvdzdmczBsNjAyc3B2OXlqemRxdHQifQ.ysJVlJCtVaVQVXdoIvMKDw&limit=1'
    request({url:url,json:true},(error,{body}) =>{
        if(error){
            callback('unable to connect to locations services!',undefined)
        }
        else if(body.features.length == 0){
            callback('unable to connect to locations. Try another search',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitute:body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
        
    })
}

module.exports = geocode;