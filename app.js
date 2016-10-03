var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var neo4j=require("neo4j-driver").v1;


var app=express();

//View Engine
app.set('views',path.join(__dirname,"views"));

app.set("view engine",'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));


var driver=neo4j.driver("bolt://localhost",neo4j.auth.basic("neo4j","keepitsimple"));
var session=driver.session();


app.get("/",function(req,res)
{
  session.run("MATCH (person:Person) RETURN person LIMIT 25 ")
        .then(function(result)
      {
        var movieArray=[];
        //console.log(result);
      result.records.forEach(function(record)
      {
        console.log(record._fields[0].properties.name);
      })
      res.render('index');
      })
        .catch(function(err)
      {
        console.log("err",err);
      });
  // res.send("It works");
})
app.listen(3000);

console.log("server started at port 3000");

module.exports=app;
