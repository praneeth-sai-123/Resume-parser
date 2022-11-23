const fs = require('fs')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require("../models/uploads");

var savedb = {
  resume: function (file) {
    fs.readFile(file, "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        const user_resume = JSON.parse(jsonString);
        var name =user_resume.name;
        var email = user_resume.email;
        var expVal=0;
        var exp = user_resume.experience;
        if(user_resume.hasOwnProperty('experience')){
        matches = exp.match(/\d+/g);
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        for (i=0; i< matches.length ;i++)
          {
            if(matches[i]>1950){
            expVal =matches[i];
            break;
            }
          }
        expVal = year - expVal;
        }
        const user = new userModel({
          name,
          email,
          "experience": expVal
         });
        user.save()
        .then(user=>{
          console.log("successfully stored")
          console.log(typeof expVal);
      })
      .catch(err=>{
         console.log(err);
      })
      }
       catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
    
  }
}

module.exports = savedb;