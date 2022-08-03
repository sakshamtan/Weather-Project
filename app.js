const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extension : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const key = "7d0d30acb55a399ee06963a5255cdb68";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let weatherDesc = weatherData.weather[0].description;
            let icon = weatherData.weather[0].icon;
            let imgUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

            res.write("<h1> The temperature in " + query + " is " + temp + " degrees celcuis. </h1>"); // res -> app.get ka res
            res.write("<h3> The weather is currently " + weatherDesc + " .</h3>"); // to send multiple responses use res.write 
            res.write("<img src =" + imgUrl + ">");
            res.send();
        });
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000.");
});