const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const user_routes = require('./routes/user_routes');
const routes = require("./routes/routes");
const userSchema = require('./schemas/userSchema');


// middleware setup
app.use(cors());
var jsonParser = bodyParser.json()
app.use(jsonParser);
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: false
}))
app.set('json spaces', 4);


// home page or routes
app.get('/', (req, res) =>{
    res.send('Wellcome to the home page')
})


// database connection with mongoose
mongoose
    .connect('mongodb://127.0.0.1:27017/user_management',)
    .then(()=> console.log("connection successful"))
    .catch((err)=> console.log(err));


// management routes
app.use(routes)


// application routes


// 404 routes
app.use((req, res, next) =>{
    res.status(404).send("error ! 404 page not found")
})

// app routes
app.listen(port, ()=>{
    console.log(`This app listening on this port http://localhost:${port}`)
})
