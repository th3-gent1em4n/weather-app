const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const { stringify } = require("querystring");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    console.log(query);
    const apiKey = "6e648f3a1c64d77bc01083ff1c5dd382";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=metric";
    
    
    https.get(url,function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherCondtion = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> Current Temperature in "+query+" is: " + temperature + " degree Celcius</h1>");
            res.write(" <h2> Weather Description in "+query+" is: " + weatherCondtion + "</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });      

    });

});


app.listen(3000, function(){
    console.log("Your Server is live @ port:3000");
});