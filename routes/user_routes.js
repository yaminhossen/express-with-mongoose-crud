const express = require('express');
const { all, show, store, update, destroy, deactivate } = require('../controllers/userController');
const router = express.Router();

const users = [
    {name:"Yamin", age:"22"},
    {name:"Mahin", age:"18"},
    {name:"Tamim", age:"16"},
]

module.exports = router
       .get('/', all)
       .get("/:id", show)
       .post("/", store)
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