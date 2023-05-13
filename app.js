const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const user_routes = require('./routes/user_routes');
const routes = require("./routes/routes");
const userSchema = require('./schemas/userSchema');
const cookieSession = require('cookie-session');


app.use(
    cookieSession({
    name: 'session',
    keys: ["my secret"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})
);

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
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <ul id="list">
    
        </ul>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js" integrity="sha512-uMtXmF28A2Ab/JJO2t/vYhlaa/3ahUOgj1Zf27M5rOo8/+fcTUVH0/E0ll68njmjrLqOBjXM3V9NiPFL5ywWPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
            
            axios.get('/users')
           .then(res => {
                console.log(res.data)
           })
            
        </script>
    </body>
    </html>`)
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
