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
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 var dataservice=require('./data-service');

 const fs = require('fs');

 var multer = require("multer");
 const path = require("path");

 const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

 const upload = multer({ storage: storage });

 app.use(express.static('public'));
 
 app.get("/", (req, res) => {
     res.sendFile(__dirname + "/views/home.html");
 });
 app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/images/add", (req, res) => {
  res.sendFile(__dirname + "/views/addImage.html");
});

app.post("/images/add", upload.single("imageFile"), (req, res) => { 
  res.redirect("/images");
});

app.get("/images", (req, res) => {
    fs.readdir("./public/images/uploaded", function(err, items){
        if (err) {
            res.send("Server internal error!");
        } else {
            let jsonMessage = {images: []};
            items.forEach(function(item) {jsonMessage.images.push(item)});
            // res.send(JSON.stringify(jsonMessage));
            res.json(jsonMessage)
        }
    })
    // res.json()
    
  });

app.get("/employees", (req, res) => {
    if(req.query.status) {
        dataservice.getEmployeesByStatus(req.query.status).then((result) => {
            res.send(result);
        }).catch(message => {
            let myjson={};
            myjson["message"]=message;
            res.send(JSON.stringify(myjson));
        })
    } else if(req.query.department) { 
        dataservice.getEmployeesByDepartment(req.query.department).then(result => {
            res.send(result);
        }).catch(message => {
            let myjson={};
            myjson["message"]=message;
            res.send(JSON.stringify(myjson));
        })
    } else if(req.query.manager) { 
        dataservice.getEmployeesByManager(req.query.manager).then(result => {
            res.send(result);
        }).catch(message => {
            let myjson={};
            myjson["message"]=message;
            res.send(JSON.stringify(myjson));
        })
    } else {
        dataservice.getAllEmployees().then(function(result){
            res.send(result);
        }).catch(function(message){
            var myjson={};
            myjson["message"]=message;
            res.send(JSON.stringify(myjson));
        });
    }

});

app.get("/employee/:value", (req, res) => {
    dataservice.getEmployeeByNum(req.params.value).then(result => {
        res.send(result);
    }).catch(message => {
        var myjson={};
        myjson["message"]=message;
        res.send(JSON.stringify(myjson));
    });
  });

app.get("/employees/add", (req, res) => {
    res.sendFile(__dirname + "/views/addEmployee.html");
});

app.post("/employees/add", (req, res) => {
    console.log(req.body)
    dataservice.addEmployee(req.body).then(function(result){
        res.redirect("/employees")
    })
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

 