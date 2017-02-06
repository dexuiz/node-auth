var express =       require('express');
var mongoose =      require('mongoose');
var passport =      require('passport');
var bodyParser =    require('body-parser');
var LocalStrategy = require("passport-local");
var passLocMon =    require("passport-local-mongoose");
var User=           require("./models/user");


mongoose.connect("mongodb://localhost/auth_demo");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(require("express-session")({
  secret:"dexuiz is me",
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------------------------
//ROUTES
//---------------------------------------------


app.get("/",function(req,res){
  res.render("home");
});

app.get("/account",function(req,res){
  res.render("account");
});

app.get("/register",function(req,res){
  res.render("register")
});

app.post("/register",function(req,res){
  User.register(new User({username:req.body.username}) ,req.body.password ,function(err,user){
    if (err) {
      console.log("error");
      return re.render("register");
    }else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/account");
      });
    }
  })
})
app.listen(process.env.port || 3000,function(){
  console.log("server started on 3000");
});
