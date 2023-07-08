const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const app =express();

app.use(body.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
//cache trails
let setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  // you only want to cache for GET requests
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=432000`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`)
  }

  // remember to call next() to pass on the request
  next()
}

// now call the new middleware function in your app

app.use(setCache)
//chache teail ends

//main page get request
app.get("/",function(req,res){
// res.sendFile(__dirname+"/public/index.html")
res.render(index);
});
//search page get request 
app.get("/search",(req,res)=>{
// res.sendFile(__dirname+"/public/search.html")
res.render("search");
});

app.listen(process.env.PORT||3000,()=>{
  console.log("renning");
});
//database connection
const uri = "mongodb+srv://bhargav:bhargav%40227@cluster0.r0cqany.mongodb.net/numbers";
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set('strictQuery', true);

// db scema
const rollscema = new mongoose.Schema({
  number:String,
});

// db model or table or collection
const rollNumber=mongoose.model("rollNumber",rollscema);

// inseting to db and redirecting to picture
app.post("/",function(req,res){
var rNo =req.body.input;
const roll = new rollNumber({
  number:rNo
  });
  roll.save()
  // res.redirect("http://ecap.pace.ac.in//StudentPhotos/"+rNo+".jpg");
//   res.end();

});
//search query
app.post("/search",(req,res)=>{
  var item=req.body.input1;
  rollNumber.findOne({number:item},function(err,data){
      if(data==null){
      res.render("failure")}
     else{
       res.render("success")
      
     }
    
  })
  
});
