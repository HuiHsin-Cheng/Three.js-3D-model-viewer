var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ARMATERIALS_COLLECTION = "arMaterials";

var initMongoDb = new Promise(
    function(resolve, reject){
        mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://lecturer:lecturer123@ds143326.mlab.com:43326/ar-materials", function (err, client) {
        if (err) {
            reject(err);
            // process.exit(1);
        }
        // Save database object from the callback for reuse.
        resolve(client.db());  
        console.log("Database connection ready");
        });
    }
);


// CONTACTS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
  


module.exports = {
    initMongoDb,
    ARMATERIALS_COLLECTION,
    ObjectID
};