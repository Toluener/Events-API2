const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const eventModel = require('../model/Eventschema');
const sendEmail = require('../utilis/email');

const Populate = async (id, pathname) => {
    return await eventModel.findById(id).populate({path:pathname}).exec();}

const doublePopulate = async (id, pathname, pathname2) => {
      return await eventModel.findById(id).populate({path:pathname}).populate({path: pathname2}).exec();}
    

   const email = async (mail, Subject, Message) => { 
    
    await sendEmail(
        {
          email: mail,
          subject: Subject,
          message: Message
        })
    }





module.exports = {Populate, doublePopulate, email};