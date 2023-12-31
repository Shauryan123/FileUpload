const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});

const DB = "mongodb://localhost:27017/demoForFileUpload";

const connectToMongo = async() => {

    await mongoose.connect(DB);

    console.log("Connected to Mongo Successfully!!");


}

module.exports = connectToMongo;