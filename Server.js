const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const useRouter = require("./router/router");
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use("/", useRouter);




mongoose.connect('mongodb+srv://rawi:rawi1234@cluster0.exbid.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => {
        app.listen(4000);
        console.log("connected to db port 4000");
    })
    .catch(err => console.log(err))
