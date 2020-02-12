const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, function() {
    console.log("Server has started and is currently running on port 3000");
})

app.post("/", function(req, res) {
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    request(url, function(error, response, body){
    console.log("Server status:", response.statusCode);
        
        let data = JSON.parse(response.body);
        let price;

        if (currency === "EUR")
        {
            price = data.bpi.EUR.rate_float;
            console.log(price);
        }
        else 
        {
            price = data.bpi.USD.rate_float;
            console.log(price);
        }

    })
    console.log(currency);
    
})