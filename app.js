const express = require('express');
const https = require("https");
const bodyParser = require('body-parser')
const ejs = require("ejs");
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));
app.get("/", function (req, res){
    res.render("home");
})

app.post("/", function(req, res){
    //console.log(req.body.city);
    const appid = "bbfab3bd269a4780b7694721231004"
    const query = req.body.city
    const url = "https://api.weatherapi.com/v1/current.json?key="+appid+"&q="+query+"";

    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
           const weatherData = JSON.parse(data);
            //const temp = weatherData.current.temp_c;
            console.log(weatherData);
            const rawTime = weatherData.location.localtime;
            const formattedTime = new Date(rawTime).toLocaleTimeString();
            res.render("report", {
                
                name: weatherData.location.name,
                time: formattedTime,
                country: weatherData.location.country,
                temp: weatherData.current.temp_c,
                day: weatherData.current.is_day,
                icon: weatherData.current.condition.icon,
                humidity: weatherData.current.humidity
          }
        )
            
        })
    })
})



app.listen(3030,function(){
    console.log("server is listening at port 3030");
})