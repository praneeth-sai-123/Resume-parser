const express = require('express'),
      router  = express.Router(),
      parseIt = require('../utils/parseIt'),
      dbsave = require('../utils/dbsave'),
      findfile = require('../utils/recentfile'),
      multer  = require('multer'),
      crypto  = require('crypto'),
      mime    = require('mime'),
      upload  = multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './uploads/')
          },
          filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
              cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
          }
        })
      });
var done;      
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'GroveHR'});
});
router.post('/', upload.single('upl'),function (req, res, next) {
  console.log("success");
  console.log(req.file.path);
  parseIt.parseResume(req.file.path, './compiled');
  com_file=findfile('./compiled').file;
  console.log(com_file);
  dbsave.resume('./compiled/'+com_file);
  res.status(204).end();
  
  
});


module.exports = router;
