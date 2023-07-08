const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const app =express();

app.use(body.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
//cache trails
var html ="<!DOCTYPE html>

<html lang="en" dir="ltr">

    <head>

<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <meta name="description" content="it converts roll no to picture">

        <meta name="theme-color" content="#222831" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta charset="utf-8">

    <title>Roll no to pic</title>

    <style>

      .enter{font-size:300%;text-align:center;padding:2%}

      .pic{text-align:center;padding:0 20%;display:none;}

      .para{text-align:center;color:#393E46;padding:2% 10%;font-size: 100%;}

       @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap');



.btn1{



font-family: Roboto, sans-serif;

font-weight: 0;

font-size: 14px;

color: #fff;

background-color: #F0A500;

padding: 10px 30px;

border: 2px solid #FEB139;

box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;

border-radius: 50px;

transition : 500ms;

transform: translateY(0);

align-items: center;

cursor: pointer;

}



.btn1:hover{



transition : 500ms;

padding: 10px 50px;

transform : translateY(-0px);

background-color: #fff;

color: #0066cc;

border: solid 2px #0066cc;

}

body{background-color:#222831;position: absolute;top: 20%;bottom: 50%;right: 20%;left: 20%}

#roll{width:85px;height:25px}#dis{border-radius:15%;filter:drop-shadow(5px 5px 5px #222)}

</style>

<link rel="icon" type="image/x-icon" href="favicon (1).ico">

</head>

<body style="top:2px;">

    <div><center>

      <p class="para" style="color:white;">Check if your number is in our database.</p>

      <a href="/search"><button class="btn1">check</button></a>

    </center>

    </div>

    <div class="enter">

      <form action="/" method="post">

     <hi style="color:white; font-size:70%;">Enter your roll number</hi><br>

      <input type="text" id="roll" placeholder="19kq1a05***" name="input"><br>

      <input type="submit" id="btn" class="btn1" value="go" style="

    margin-top: 18px;

">

    </form>

    </div>

    <div class="pic">

      <img src="#" id="dis" alt="enter carefully!!"> <br>

      <a href="#" id="img" target="_blank" download="image.jpg">download</a>

    </div>

    <div class="para">

      <p>Using only your roll number, you may view your photos.</p>

      <p>This is done only for instructional and amusement purposes.</p>

    </div>



    <script>document.getElementById("btn").onclick = function(){

      var roolNo=document.getElementById("roll").value;

      document.getElementById("dis").setAttribute("src","http://ecap.pace.ac.in//StudentPhotos/"  + roolNo.toLowerCase() + ".jpg");

      document.getElementById("img").setAttribute("href","http://ecap.pace.ac.in//StudentPhotos/"  + roolNo.toLowerCase() + ".jpg");

      document.getElementsByClassName("pic")[0].style.display = "block";

      setTimeout(()=>{window.stop();},1000);

    }

 

    </script>

</body>

</html>



";
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
res.send(html);
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
