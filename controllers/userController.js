const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("user",userSchema);
const TryCatch = require("../models/hooks/TryCatch");
var jwt = require('jsonwebtoken');  

const users = [
    {name:"Yamin", age:"22"},
    {name:"Mahin", age:"16"},
    {name:"Tamim", age:"14"},
]

const all = async (req, res)=>{
    let newUser = await User.find().exec();
    res.json(newUser);
}
const show = async (req,res)=>{
    console.log(req.params.id)
   let user = await User.findOne().where({"_id": req.params.id}).exec();
   res.json(user);
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
const update = async (req,res)=>{
    let user = await User.findOne().where({"_id": req.params.id}).exec();
    user.name = req.body.title;
    user.age= req.body.age;
    await TryCatch(user);
    res.json(user)
    /* let id = req.params.id;
    users[id] = {name:req.body.title,age:req.body.age}
    console.log(req.body);
    res.json(users); */
}
const deactivate = (req,res)=>{
    let id = req.params.id;
    users.splice(id, 1)
    res.json(users);
}
const destroy = async (req,res)=>{
    let user = await User.deleteOne().where({ "_id": req.params.id }).exec();
    await TryCatch(user);
    res.json(user);
    /* let id = req.params.id;
    users.splice(id, 1)
    res.json(users); */
}

module.exports = {
    all,
    show,
    store,
    update,
    deactivate,
    destroy,
    register: async (req, res) =>{
        const {name, email} = req.body; 
        const token_res = await jwt.sign({name, email}, '3he5jmb3u3v');
        res.status(201).json({token: token_res, name, email});
        console.log(token_res)
    },
    login: async (req, res)=> {
        const {name, email, id} = req.body;
        const user = await User.where({_id: id}).findOne();
      
        if(!user){
           return res.status(422).send("unprocessible entity, user not found");
        } 
        const token_res = await jwt.sign({name, email, id}, '3he5jmb3u3v');
        res.status(201).json({token: token_res, name, email});
        console.log(token_res)
    },
}