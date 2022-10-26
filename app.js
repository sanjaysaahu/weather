const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app= express()

app.use(bodyParser.urlencoded({extended : true}))


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

})


app.post("/",function(req,res){
    
    let country = req.body.countryname
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=634d4ec8bf90723778d2ba670dd53b66&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.main.temp
            const description = weatherdata.weather[0].description
            console.log(weatherdata)
            console.log(temp);
           // res.write("<h2> the weather description is "+description+" </h2>")
            res.write("<h1> the weather description is "+description+"</h1>")
            res.send()
        })
    })
    
})







app.listen(3000,function(){
    console.log("server is running in the port 3000")
})