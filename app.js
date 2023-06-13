const express = require("express");
const bodyParser = require("body-parser");
const File = require("./model/fileSchema");
const multer = require("multer");
const connectToMongo = require('./server')

const app = express();
const path = require("path");

connectToMongo();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

app.post("/api/uploadFile", upload.single("myFile"), async(req, res) => {
    // Stuff to be added later
    console.log("JIIIIIII")
    console.log(req.file);
    try {
        const newFile = await File.create({
            name: req.file.filename,
        });
        await newFile.save();
        res.redirect('/')
    } catch (error) {
        res.json({
            error: error
        });
    }
});

app.get("/api/getFiles", async(req, res) => {
    try {
        const files = await File.find();
        res.status(200).json({
            status: "success",
            files,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});
app.use("/", (req, res) => {
    res.status(200).render("index");
});
// Configurations for "body-parser"

// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER

// Routes will be added here later on

//Express server

app.listen(3000, () => {
    console.log('Serving on port 3000')
})


module.exports = app;