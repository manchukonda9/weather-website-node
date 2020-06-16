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
           callback(undefined,"the temprature in "+body.name+" is "+body.main.temp+" and "+body.weather[0].description)
        }
    })
}

module.exports = forecast;