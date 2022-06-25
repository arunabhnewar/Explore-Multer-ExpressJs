// dependencies
const express = require('express');
const multer = require('multer');
const path = require('path');


// App Object
const app = express();


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})



// Upload destination
const UPLOAD_DEST = './uploads'


// Multer configuring

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, UPLOAD_DEST)
    },

    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + '-' + Date.now() + fileExt;

        cb(null, filename);
    }
})


const upload = multer({
    storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {

        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {

            cb(null, true)
        } else {

            cb(new Error("File type is not accepted!!"))
        }
    }
})





app.post("/handleformdata", upload.fields([
    {
        name: "profile",
        maxCount: 1
    },
    {
        name: "cover",
        maxCount: 3
    }
]), (req, res) => {

    console.log(req.files);
    console.log(req.body);
    res.send("File Upload is Done")
})



// Server listen
app.listen(3000, () => {
    console.log("Server is listening on port" + " " + 3000);
})