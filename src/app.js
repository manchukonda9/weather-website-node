const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//define paths from express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory
app.use(express.static(publicDirectoryPath))

//setup handle bars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Application',
        name:'krishna'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'krishna'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Some helpful text is here',
        title:'Help',
        name:'krishna'
        
    })
})

app.get('/about/*',(req,res) =>{
    res.render('404',{
        title:'404 page not found',
        name:'krishna'
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 page not found',
        name:'krishna'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'please enter a valid address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitute,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitute,(error,forecasData) =>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecastData:forecasData,
                location,
                address:req.query.address
            })
        })
    })
  
})
app.get('/products',(req,res) =>{
    if(!req.query.search){
       return res.send({
            error:'you must enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })


    
})
app.get('/*',(req,res) =>{
    res.render('404',{
        title:'page not found',
        name:'krishna'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up and running in 3000')
})