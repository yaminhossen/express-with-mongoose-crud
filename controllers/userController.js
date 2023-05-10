const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("user",userSchema);
const TryCatch = require("../models/hooks/TryCatch");

const users = [
    {name:"Yamin", age:"22"},
    {name:"Mahin", age:"16"},
    {name:"Tamim", age:"14"},
]

const all = (req, res)=>{
    res.json(users);
}
const show = (req,res)=>{
    console.log(req.params.id)
    res.json(users[req.params.id]);
}
const store = async (req, res)=>{
    const newUser = new User(req.body);
    let data = await TryCatch(newUser)

    if (!data) {
        return res.json("error")
    } 
    // user.push({title});
    res.json(newUser);
    
}
const update = (req,res)=>{
    let id = req.params.id;
    users[id] = {name:req.body.title,age:req.body.age}
    console.log(req.body);
    res.json(users);
}
const deactivate = (req,res)=>{
    let id = req.params.id;
    users.splice(id, 1)
    res.json(users);
}
const destroy = (req,res)=>{
    let id = req.params.id;
    users.splice(id, 1)
    res.json(users);
}

module.exports = {
    all,
    show,
    store,
    update,
    deactivate,
    destroy
}