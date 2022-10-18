/***********************************************************************************************
 * WEB322-Assignment 2
 * Ideclare that this assignment is my own work in accordance with Seneca Acdemic Policy.
 * No part of this assigment has been copied manually or electronically from any other source.
 * (including web sites)or distributed to other students.
 * 
 * Name: Rashin Sharifi  Student ID:150653210   Date:2-oct-2022
 * 
 * Online (Cyclic) URL:
 * https://shiny-cyan-turtle.cyclic.app
 ***********************************************************************************************/



 var HTTP_PORT = process.env.PORT || 8080;
 var express = require("express");
 var app = express();
 var dataservice=require('./data-service');
 

 app.use(express.static('public'));
 
 app.get("/", (req, res) => {
     res.sendFile(__dirname + "/views/home.html");
 });
 app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/employees", (req, res) => {
dataservice.getAllEmployees().then(function(result){
    res.send(result);
}).catch(function(message){
    var myjson={};
    myjson["message"]=message;
    res.send(JSON.stringify(myjson));
});
   
}); 
app.get("/managers", (req, res) => {
    dataservice.getManagers().then(function(result){
        res.send(result);
    }).catch(function(message){
        var myjson={};
        myjson["message"]=message;
        res.send(JSON.stringify(myjson));
    });
});

app.get("/departments", (req, res) => {
    dataservice.getDepartments().then(function(result){
        res.send(result);
    }).catch(function(message){
        var myjson={};
        myjson["message"]=message;
        res.send(JSON.stringify(myjson));
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

dataservice.initialize().then(function(){
app.listen(HTTP_PORT);
})
.catch(function(){
    console.log("initialized failed");
    });

 