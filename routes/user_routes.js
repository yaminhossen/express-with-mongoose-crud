const express = require('express');
const { all, show, store, update, destroy, deactivate, login, register } = require('../controllers/userController');
const router = express.Router();

const users = [
    {name:"Yamin", age:"22"},
    {name:"Mahin", age:"18"},
    {name:"Tamim", age:"16"},
]

const cheak_request = function(req, res, next) {
    // console.log(req.headers);
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).send("access denies!! auth required");
    }else{
        let [prefix, token] = authorization.split(" ");
        if(prefix != "mytoken"){
            return res.status(422).send("unprocessible token.")
        }
        if(token != "xxx"){
            return res.status(498).send("invalid token")
        }
        console.log(prefix, token)
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