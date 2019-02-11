const express = require('express'); 
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('fast-csv');

const app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//To remove this error: Access to XMLHttpRequest at 'http://localhost:8081/diagnose' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = process.env.port || 8081;
let symptoms = [];

app.post("/diagnose", (req, res) => {

    console.log(req.body.symptoms);
    symptoms = [...req.body.symptoms]
    
    const ws = fs.createWriteStream('Symptoms.csv',  {flags: 'w'});
    csv.write([[...symptoms]]).pipe(ws);

    // use spawn and call python Module

    let disease = '';
    var spawn = require("child_process").spawn; 
    var process = spawn('python', ["./Predict.py"] );
    let diseases = []
    let percentage = []
    let output;
    
    process.stdout.on('data', function(data) { 
        disease = data.toString().split(",");
        // disease = disease.split(",");
        for(let i = 0; i < (disease.length - 1); i+=2 ){
            diseases.push(disease[i])
            percentage.push(Number.parseFloat(disease[i+1]))
            // console.log(disease[i] + " " + disease[i+1]);
        }
        diseases = diseases.map((ele, index)=>{
            return ele.split("_").join(" ")
        })
        percentage = percentage.map((ele, index)=>{
            return ele.toFixed(2)
        })
        
        output = {
            "diseases": diseases,
            "percentage": percentage
        }
    
        // console.log("Disease: " + disease);
    }); 

    process.on('error', function(error) {
        console.log("Error: " + error);
    });

    process.on('close', function (code) {  
        res.status(200).json({response: output}); 
        console.log(output);
     });  

});

app.listen( port, (req, res) => {
    console.log("Server Started at: " + port);
});