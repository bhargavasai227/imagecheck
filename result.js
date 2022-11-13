const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const app =express();
app.use(body.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
});

app.listen(process.env.PORT);


const uri = "mongodb+srv://bhargav:bhargav%40227@cluster0.r0cqany.mongodb.net/numbers";
mongoose.connect(uri, { useNewUrlParser: true });

// db scema
const rollscema = new mongoose.Schema({
  number:String,
});

// db model or table or collection
const rollNumber=mongoose.model("rollNumber",rollscema);

// inseting to db
app.post("/",function(req,res){
var rNo =req.body.input;
const roll = new rollNumber({
  number:rNo
  });
  roll.save();
  res.redirect("/");

});
