const request = require('request');


const forecast = (longitute,latitude,callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&'+'lon='+encodeURIComponent(longitute)+'&appid=1f0bad989763aaa06dad8137e9a6c095&units=metric'
    
    request ({url :url,json:true},(error,{body}) =>{
        if(error){
            callback("Couldn't locate the coordinates",undefined)
        }
        else if(body.message){
            callback("some thing wrong with the inpud",undefined)
        }
        else{
           callback(undefined,"Temprature in "+body.name+" is "+body.main.temp+". Today's Low: "+body.main.temp_min+"; Today's high"+body.main.temp_max+" and feels like " +body.main.feels_like+". Description: "+body.weather[0].description+ " and wind speed is " +body.wind.speed +" mph")
        }
    })
}

module.exports = forecast;