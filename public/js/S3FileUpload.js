const multer = require('multer');
const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
const fs = require('fs');

// aws.config.update({
//     // Your SECRET ACCESS KEY from AWS should go here,
//     // Never share it!
//     // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
//     secretAccessKey: "PhIPmaZHWYO0sXym0l6U6Jcjxqj6/Vni5b8eUNqt",
//     // Not working key, Your ACCESS KEY ID from AWS should go here,
//     // Never share it!
//     // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
//     accessKeyId: "AKIAIXACXFRJBRNNFM6Q",
//     region: 'ap-southeast-1' // region of your bucket (Asia Singapore)
// });

//Aws server
// const s3 = new aws.S3();
// const AR_BUCKET = 'ar.materials';

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: AR_BUCKET,
//       acl: 'public-read',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, `${Date.now().toString()}.${file.originalname}`)
//       }
//     })
//   })

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now().toString()}.${file.originalname}`)
      }
    })
  })
  
  //Aws 
  // const deleteFile = function(key){
  //   console.log("DELETE FILE");
  //   console.log(key);
  //   s3.deleteObject({
  //     Bucket: AR_BUCKET,
  //     Key: key
  //   },function (err,data){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }

  const deleteFile = function(key){
    console.log("DELETE FILE");
    console.log(key);
    fs.unlink("uploads/"+ key, function (err) {            
      if (err) {                                                 
          console.error(err);                                    
      }                                                          
     console.log('File has been Deleted');                           
  });                                                            
  }

  module.exports = {
    upload,
    deleteFile
  };