const express = require("express");
const router = express.Router();
const { upload, deleteFile } = require('../public/js/S3FileUpload');
const { initMongoDb, ARMATERIALS_COLLECTION, ObjectID } = require('../public/js/MongoDbUpload');
const fetch = require("node-fetch");
const fs = require('fs');
const request = require("request")
const singleUpload = upload.single('file');
const multiUpload = upload.array('arMaterial', 20);
async function createFile(MY_URL){
  let response = await fetch(MY_URL);
  let data = await response.blob();
  let metadata = {
    type: 'json'
  };
  let file = new File([data], "test.json", metadata);
  // ... do something with the file or return it
  return file
}



router.post('/files', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    console.log(res);
    return res.json({'fileUrl': req.file.location});
  });
})

/* "/arMaterials"
*   Post: post materials
*/
router.post('/arMaterials', function(req, res){
  try{
    console.log("POST");
    multiUpload(req, res, function(err){
      if (err) {
        res.status(422).json({errors: [{title: 'AR Files Upload Error', detail: err.message}] });
      }
      var files = req.files;
      console.log("-------------------------");
      console.log(req.files);
      console.log("-------------------------");
      console.log(req.body);
      //After upload image and model, add document to mongodb
      if(files.length>0){
        var _count = files.length
        var png_names = []
        var png_locations = []
        var document_names = []
        var document_loacations = []
        var png_len = Number(req.body.png_len)
        if(png_len>0){
          for(i=4;i<4+png_len;i++){           
            png_names.push(files[i].originalname)
            png_locations.push("https://ar.keshufang.com/"+files[i].path)
          }
        }
        for(i=Number(req.body.index_doc);i<_count;i++){           
          document_names.push(files[i].originalname)
          document_loacations.push("https://ar.keshufang.com/"+files[i].path)
        }

        var newArMaterial = {}
        if(Number(req.body.index_doc) != 1)//有模型的情況
        {
          newArMaterial = {
            "imageName": files[0].originalname,
            "imageLocation": "https://ar.keshufang.com/"+files[0].path,
            "modelName": (files[1].originalname),
            "modelLocation": "https://ar.keshufang.com/"+files[1].path,
            "textureName": (files[2].originalname),
            "textureLocation": "https://ar.keshufang.com/"+files[2].path,
            "TLGFmodelName": (files[3].originalname),
            "TLGFmodelLocation": "https://ar.keshufang.com/"+files[3].path,
            "PNG_names": png_names,
            "PNG_locations": png_locations,
            "description": req.body.description,
            "document_names": document_names,
            "document_locations": document_loacations,
            "TimeStamp": new Date()
          }
        }
        else{
          newArMaterial = {
            "imageName": files[0].originalname,
            "imageLocation": "https://ar.keshufang.com/"+files[0].path,
            "modelName": null,
            "modelLocation": null,
            "textureName": null,
            "textureLocation": null,
            "TLGFmodelName": null,
            "TLGFmodelLocation": null,
            "PNG_names":null,
            "PNG_locations": null,
            "description": req.body.description,
            "document_names": document_names,
            "document_locations": document_loacations,
            "TimeStamp": new Date()
          }
        }
        
        console.log("-------------------------");
        console.log(newArMaterial);
  
        initMongoDb.then(function(db){
          db.collection(ARMATERIALS_COLLECTION).insertOne(newArMaterial, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to create new AR material.");
            } else {
              res.status(200).json(doc.ops[0]);      
            }
          });
        })
        .catch(function(error){
          console.log(error);
        });
      }
    })
  }
  catch(err){
    res.status(500).end(err);
  }
})

/* "/arMaterials"
*   GET: finds all AR materials
*/
router.get('/arMaterials', function(req, res){
  try{
    initMongoDb.then(function(db){
      db.collection(ARMATERIALS_COLLECTION).find({}).toArray(function(err, docs){
        if(err){
          handleError(res, err.message, "Failed to get all AR materials.");
        }else{
          res.status(200).json(docs);
        }
      })
    })
  }
  catch(err){
    res.status(500).end(err);
  }
})

/* "/arMaterials/:id"
*   POST: delete AR material by id
*/
router.post("/arMaterials/:id", function(req, res){
  try{
    initMongoDb.then(function(db){
      console.log("DELETE");
      console.log(req.params.id);
      db.collection(ARMATERIALS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result){
        if(err){
          handleError(res, err.message, "Failed to delete an AR material.");
        } else{
          res.status(200).json(req.params.id);
        }
      })
    });
    console.log("DELETE");
    console.log(req.body);
    var imageLocationArr = req.body.imageLocation.split("/");
    var modelLocationArr = req.body.modelLocation.split("/");
    var textureLocationArr = req.body.textureLocation.split("/");
    var TLGFmodelLocationArr = req.body.TLGFmodelLocation.split("/");
    var imageKey = imageLocationArr[imageLocationArr.length-1];
    var modelKey = modelLocationArr[modelLocationArr.length-1];
    var textureKey = textureLocationArr[textureLocationArr.length-1];
    var TLGFmodelKey = TLGFmodelLocationArr[TLGFmodelLocationArr.length-1];

    deleteFile(imageKey);
    deleteFile(modelKey);
    deleteFile(textureKey);
    deleteFile(TLGFmodelKey);
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;