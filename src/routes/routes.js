const express = require('express');
const mongoose = require('mongoose');
const eventModel = require('../model/Eventschema');
const attendeeModel = require('../model/Attendee');
const User = require('../model/User');
const {auth, authAdmin, authUser, authUserAdmin}= require('../middleware/auth');
const {Populate, doublePopulate, email} = require('../helper/helper');



const app = express();

app.use(express.json());


//GET Homepage
app.get('/', (req, res) => 
{res.send('Welcome to Events API');
res.end();});


//GETALL Events
app.get('/events', auth, authAdmin, async (req, res) =>
{const events = await eventModel.find({});

try {
    res.status(200).json(events);}
 catch(error){res.status(500).send(error);}
});


//GET An event
app.get('/event/:id', auth, authUserAdmin, async (req, res) =>
{  
    await eventModel.findById(req.params.id);
try {
    Populate(req.params.id, 'attendees').then(async function(result){
        res.status(200).json(result);
    })}
 catch(error){res.status(500).send(error);}
});



//POST create a new event
app.post('/event', auth, async (req, res) =>{

   const user = await User.findById(req.body.user);
    if(!user){res.status(404).send("No such user in database, please pass in an authentic user"); return;}

    else if(user){

    const event = new eventModel(req.body);

    try {
        await event.save();

        const id = event.id;
    Populate(id, 'attendees').then( async function(result){
        if(result.attendees){

            for(let i = 0; i < result.attendees.length; i++ ){
             const subject = 'Event Attendance Status';

             const message = `You've been added as an attendee for the event ${result.eventname}`;

            email(result.attendees[i].email, subject, message)}
        } 
    }); 
    res.status(200).json(event);}
      catch(error) { res.status(500).send(error);}
} 
})


//CREATE ATTENDEES
app.post('/attendee', auth, async (req, res)=>{
    const attendee = new attendeeModel(req.body);
    try{
        await attendee.save();
        res.status(200).json(attendee);
    }catch(error){
        res.status(500).send(error);
    }
})





//PATCH  update event
app.patch('/event/:id', auth, authUser, async (req, res) => {
    
    try{
        const event = await eventModel.findById(req.params.id);

        if(!event){ res.status(404).send("Event not found");}
    
    else if(event && !req.body.attendees){
        await eventModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
                res.status(200).send(`event updated:\n \n ${event}`);}
    else{res.status(400).send('Note: You cannot update attendees on this route');}            
    }
catch(error){res.status(500).send(error);}
})



//adding an Attendee to already existing attendees
app.patch('/event/attendee/:id', auth, authUser, async (req, res) => {
    try{
        const event = await eventModel.findById(req.params.id);

        if(!event){ res.status(404).send("Event not found");}

        else if(event&&req.body.attendee){
    const attendee = await attendeeModel.findById(req.body.attendee);

    if(!attendee) {res.status(404).send('Please enter a valid attendee that exists in the database'); return;}

    else if(attendee){
     
        event.attendees.push(req.body.attendee);
     await event.save();

           await Populate(req.params.id, 'attendees').then( async function(result){
                let index = result.attendees.findIndex(attendee => attendee.id === req.body.attendee);

                if (index >= 0){
                    const subject = 'Event Attendance Status';

             const message = `You've been added as an attendee for the event ${result.eventname}`;

            email(result.attendees[index].email, subject, message);
            res.status(200).send('Attendee has been added and an email has been sent to the attendee');
        }
    })
}else{res.status(409).send('Please ensure your attendee value is only wrapped by quotation marks and it is not an array'); return;}
}
   else{res.status(400).send('you are only allowed to add the attendee key value pair in the request body and make sure you have the attendee Id as part of the query parameters');}
    }
    catch(error){res.status(500).json(error);}
})


//DELETE EVENT

app.delete('/event/:id', auth, authUserAdmin, async (req, res) => {
    try{
        const event = await eventModel.findById(req.params.id);

        if(!event) {res.status(404).send("Event not found"); return}

        else if(event&&req.body.reason&&req.body.title){

           doublePopulate(req.params.id, 'user', 'attendees').then( async function(result){
            
        const subject ='Event';
        const message2 = `Please take note that the event: ${result.eventname}, you were added to has now been deleted`;    
        const message = `The event: ${result.id}, ${result.eventname}, has been deleted by the ${req.body.title}.
        \n Reason: ${req.body.reason}`

            email(result.user.email, subject, message);

            for(i =0; i < result.attendees.length; i++){
            email(result.attendees[i].email, subject, message2);
            }
            await eventModel.findByIdAndDelete(req.params.id);
           });

    res.status(200).send('The event has been deleted'); 
     return;
        }
        else{res.status(400).send('Please make sure you have your reason key and value pair as well as title key and value pair in your request body'); return;}
        }
    catch(error) {res.status(500).json(error);}});




  //DELETE ATTENDEE FROM EVENT

  app.delete('/remove/attendee/:id', auth, authUser, async (req, res) => {
    try{
        const event = await eventModel.findById(req.params.id);

        if(!event){ res.status(404).send("Event not found");}
    
 else if(event&&req.query.attendeeId){
    
        const id = req.params.id;

        Populate(id,'attendees').then( async function(result){

    let index = result.attendees.findIndex(attendee => attendee.id === req.query.attendeeId); 

          if(index >= 0){
            let arr = event.attendees.splice(index, 1);
        await event.save();
        
        const subject = 'Event Attendance Status';
        const message = `You have been removed from the event: ${event.id} with description: ${event.description}`
        
        email(result.attendees[index].email, subject, message);
            res.status(200).send('attendee deleted');} 
        else{res.status(404).send('no such attendee exists in the attendee database');}
    }); 
   }else{res.status(400).send('Please the attendee Id is required as a query parameter');}
} 
catch(error){res.status(500).json(error);}
});


//Accept or Reject Event
app.post('/event/status/:id', auth, authAdmin, async (req, res) => {
    try{ const id = req.params.id;
        const event = await eventModel.findById(req.params.id);

        if(!event) {res.status(404).send("Event not found");}

        else if(event&&req.body.status&&req.body.reason){
            Populate(id, 'user').then( async function(result){
                if(req.body.status === 'Approved'){
                    const subject = 'Event Status';
                    const message = `Your event has been approved by the Admin. \n Reason: ${req.body.reason}`;

                    email(result.user.email, subject, message);
                    res.send('The user has been notified');    
                }
                else if(req.body.status === 'Rejected'){
                    const subject = 'Event Status';
                    const message = `Your event has been rejected by the Admin. \n Reason:${req.body.reason}`;
                    email(result.user.email, subject, message);
                    res.send('The user has been notified');
                }else{res.status(409).send('Note: your status value can only be Accepted or Rejected. Also ensure to check your capitalisation and ensure only the first letter is capitalised'); return;}
            })
        }else{res.status(400).send("Please ensure that your request body has a status key value pair, as well as a reason key value pair");
        return;}
        }
    catch(error) {res.status(500).json(error);}});


    module.exports = app;