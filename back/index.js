const express = require('express');

const bodyParser = require ('body-parser');

const router = require ('./routes/routes.js');

const mongoose = require('mongoose');

const app = express();

const cors = require('cors');




mongoose.connect('mongodb://localhost:27017/mongooseDemo', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const corsOptions = {
    exposedHeaders: ['x-auth']
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json('wow');
});

app.post('/postMethod', (request, response) => {

    let letters = /\S*(\S*([a-zA-Z]\S*[0-9])|([0-9]\S*[a-zA-Z]))\S*/;
    
    if (request.body.password.length >= 6) {
        if (request.body.password.match(letters))
        {
            response.json('correct')
        } else {
            response.json('password does not match')
        };
    } else {
        response.json('password is too short')
    };

    response.json()
})

  
// app.post('/', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//           success: false
//         });
    
//       } else {
//         console.log('file received');
//         return res.send({
//           success: true
//         })
//       }
//     // var path = req.file.path;
//     // res(path)
// })
  
app.use('/images', express.static('images'));

app.use('/api/v1', router);

app.listen(3000);