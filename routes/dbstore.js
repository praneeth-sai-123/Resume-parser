const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require("../models/uploads");

router.get('/', function (req, res) {   
        userModel.find({}, function (err, allDetails) {
            if (err) {
                console.log(err);
            } else {
                res.render('dbstore', { details: allDetails })
            }
        })
})
 
module.exports = router;
