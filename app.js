const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyparser= require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 3000;

//Define Mongo Scheme
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
//If we want to save data with mongoose using post request we need to install body-parser
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//Setting templete engine as pug
app.set('views', path.join(__dirname, 'views'));//Setting views as directory name

//END POINTS 
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then( ()=>{
        res.send("This data is send to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    
})

//Start the server
app.listen(port, ()=>{
    console.log(`The server started successfully on port ${port}`);
});