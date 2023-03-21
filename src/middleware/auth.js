const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const eventModel = require('../model/Eventschema');
const User = require('../model/User');

const auth = (req, res, next) => {
    const token = req.header('token');
    if(!token) return res.status(401).json({message: 'Authentication Error, please login in'});

    try{
        const decoded = jwt.verify(token, 'randomString');
        req.user = decoded.user;
        next();
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'Invalid Token'});
    }
};

const authAdmin = async (req, res, next) => {
  try { if(req.query.userId){
    const user = await User.findById(req.query.userId);
    if(!user){ res.status(404).send("User not found"); return;}

    else if(user.role !== "ADMIN"){
    res.status(401).send('You do not have access to this resource'); return;}
        next();
       } else if(!req.query.userId){
        res.status(400).send('please enter your userId as the query parameter');
       return;}
    }   
    catch(err) {
            res.status(500).json(err);
        };
    }
    
    
const authUser = async (req, res, next) => {
   try{ 
if(req.query.userId){
    const user = await User.findById(req.query.userId);
    if(!user){ res.status(404).send("User not found");
    return;}

    if(user){
     const id = req.params.id;
     const event = await eventModel.findById(id);
     if(!event){ res.status(404).send("Event not found"); return;}

    else if(event){
        const getUser = async (id) => {
            return await eventModel.findById(id).populate({path:'user'}).exec();}

            getUser(id).then( function(result){
            if (result.user.id !== req.query.userId){
                res.status(401).send('You do not have access to this resource'); return;}
            next();
            });
          }
    }}
else{res.status(400).send('Please enter your userId in the query parameter'); return;} 
}catch(err){
        res.status(500).json(err);
    };
}



const authUserAdmin = async (req, res, next) => {
 try{
    if(req.query.userId){
        const user = await User.findById(req.query.userId);

    if(!user){res.status(404).send('User not found'); return;}
     else if(user){const id = req.params.id;
    const event = await eventModel.findById(id);
    if(!event){ res.status(404).send("Event not found"); return;}

    else if(event){
        const getUser = async (id) => {
            return await eventModel.findById(id).populate({path:'user'}).exec();}

            getUser(req.params.id).then( function(result){
            if (user.role == "ADMIN" || result.user.id == req.query.userId){ next()}
        else{res.status(401).send('You do not have access to this resource'); return;}
        });
        }
    }}
     else if(!req.query.userId){res.status(400).send('please enter your user id in the query parameter'); return;}  
    } catch(err) {
        res.status(500).json(err);};
    }



module.exports = {
    auth,
    authAdmin,
    authUser,
    authUserAdmin
};