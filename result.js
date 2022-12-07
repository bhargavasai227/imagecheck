const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const app =express();
app.use(body.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(expressLayouts);
app.set('veiw engine', 'ejs')


app.get("/",function(req,res){
res.sendFile(__dirname+"/public/index.html")
});
app.get("/search",(req,res)=>{
res.sendFile(__dirname+"/public/search.html")
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
    if(err){
      console.log(err);
      
    }
    else{
      if(data==null){
      res.sendFile(__dirname+"/public/failure.html")
    
      }
     else{
      //  res.write("found in database");
       res.sendFile(__dirname+"/public/success.html")
      
     }
    }
  })
  
});
