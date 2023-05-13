const express = require('express');
const { all, show, store, update, destroy, deactivate, login, register } = require('../controllers/userController');
const router = express.Router();
var jwt = require('jsonwebtoken');  
const cookieParser = require('cookie-parser');

const users = [
    {name:"Yamin", age:"22"},
    {name:"Mahin", age:"18"},
    {name:"Tamim", age:"16"},
]

const cheak_request = async function(req, res, next) {
    console.log(req.headers, req.origin, req.cookies.token);
    // console.log(req.cookies.token);
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).send("access denies!! auth required");
    }else{
        let [prefix, token] = authorization.split(" ");
        if(prefix != "Bearer"){
            return res.status(422).send("unprocessible token, Bearer missing")
        }
        if(!token){
            return res.status(498).send("invalid token")
        }
        var decoded = await jwt.verify(token, "3he5jmb3u3v")
        console.log(decoded)
    }
    next();
} 

module.exports = router
       .post('/register', register)
       .post('/login', login)
       .get('/',cheak_request, all)
       .get("/:id", show)
       .post("/",cheak_request, store)
       .put("/:id", update)
       .post("/deactivate/:id", deactivate)
       .delete("/:id", destroy) 

       
        .get('/create', (req, res)=>{
        res.send(`
        <form action="/users" method="POST">
            <input name="title" placeholder="input name">
            <input name="age" placeholder="input age">
            
            <button>submit</button>
        </form>
        `)
    }); 