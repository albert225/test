var experss = require("express")
var app = experss()
var session = require("cookie-session")
var cors = require('cors')
var bodyParser = require("body-parser")
// var url = bodyp.urlencoded({ extended: false })
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/";
app.use(cors())
//console.log("ok");
MongoClient.connect(url1, function (err, db) {
  if (err) throw err;
  //console.log("Database created!");
  var dbo = db.db("mydb");
  let len = 1;
  //dbo.createCollection("Users", function(err, res) {
  // if (err) throw err;
  // console.log("Collection created!");
  // });
  //var myobj={Id:1,Name:"asd fgh",Email:"as@gmail.com",Mobile:"6546546541"};
  //dbo.collection("Users").insertOne(myobj,function(err,res){

  // console.log("data inserted in database");
  //console.log(dbo.Users.find());
  //console.log(nn);
  // console.log("delayed");
  // })
  //db.close();
  //console.log("end");
  // app.use(session({ secret: 'todo' }))

  app.get('/', function (req, res, next) {
    //console.log(req);
    //console.log(res);
    dbo.collection("Users").find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result.length);

      //console.log(result[0]);
      res.send(result)
      //next();
    })
  })

  app.post('/insert', (req, res1) => {

    //console.log('req.body', req.body)
    dbo.collection("Users").find({}).toArray(function (err, result) {
      if (err) throw err;
      len = result.length;

      var mynewobj = { Name:req.body.fn+ " " +req.body.ln,Email:req.body.em,Mobile:req.body.mb };
     // console.log(req.body.fn)
      var msg = validate(req.body.fn, req.body.ln,req.body.em,req.body.mb);
      if (msg == "valid") {
        //console.log(mynewobj);
        dbo.collection("Users").find(mynewobj).toArray(function(err,rslt){
         // console.log(rslt.length);
          if(rslt.length)
          {
            res1.send({mssg:"Already exist"});
          }
          else
          {
            mynewobj.Id=len+1;
            //console.log(mynewobj);
          dbo.collection("Users").insertOne(mynewobj, function (err, res) {
            //console.log("new user added to database");
            res1.send({ mssg: 'inserted' })
            })
          }
        
        })
      }
      else { res1.send({ mssg: msg }) }
    })
  })
  app.put('/update', (req, res1) => {

    //console.log('req.body', req.body)

    dbo.collection("Users").find({}).toArray(function (err, result) {
      if (err) throw err;
      var i = req.body.id;
      var mynewobj = {
        Id: req.body.id, Name: (req.body.name ? req.body.name : result[i].Name), Email: (req.body.email ? req.body.email : result[i].Email),
        Mobile: (req.body.mobile ? req.body.mobile : result[i].Mobile)
      };
      var msg = isnamevalid2(req.body.name,req.body.email,req.body.mobile);
      //console.log(msg);
      if(msg =="valid")
      {
        dbo.collection("Users").updateOne(result[req.body.id], { $set: mynewobj }, function (err, res) {
          if (err) throw err;
          //console.log("1 document updated");
          res1.send({ mssg: 'updated' })
        });
      }
      else{
        res1.send({mssg:msg});
      }
    })
  })


  app.delete('/delete', (req, res1) => {

    //console.log('req.body', req.body)
    dbo.collection("Users").find({}).toArray(function (err, result) {
      if (err) throw err;
      dbo.collection("Users").deleteOne(result[req.body.id], function (err, res) {
        if (err) throw err;
        //console.log("one document deleted");
        res1.send({ 'success': 'deleted' })
      });
    })
  })
  

  app.listen(3002)
});

function validate(f,l,em,mb){
  return isnamevalid(f,l,em,mb)
}
function isemailvalid(em,mb)
  {
    if(!em)
      return("please enter email");
    else
    {
      var charss = /^[A-Za-z,.,@,0-9,]+$/;
      if(em.match(charss))
       // return("valid")
       return(ismobilevalid(mb))
      return ("enter valid email");

    }
  }

    function ismobilevalid(mb) {
    if(!mb)
      return("please enter mobile number");
    else
    {
      if(mb.length===10)
      {
        if(mb[0].match(/^[0-5]+$/))
          return("Invalid mobile number")
        return("valid")
        
      }
      return("Invalid mobile number")
    }
  }

  function isnamevalid(f, l,em,mb) {
    if (!f) {
      return ('please enter first name');
    }
    else if (!l) {
      return ('please enter last name')
    }
    else {
      str = f + " " + l;
      var letters = /^[A-Za-z," "]+$/;
      if (str.match(letters))
        //return ("valid");
        return isemailvalid(em,mb);
      return ("only letters are allow in name fields");
    }

  }
  function isnamevalid2(fl,em,mb) {
    if (!fl) {
      return ('Please enter the name');
    }
    else {
      str = fl;
      var letters = /^[A-Za-z," "]+$/;
      if (str.match(letters))
        return isemailvalid(em,mb);
      return ("only letters are allow in name fields");
    }

  }