const express = require('express');
const mongoose = require("mongoose");
const request = require('supertest');
const approuter = require('../../routes/routes');
const user = require('../../routes/user');
require("dotenv").config();



beforeEach(async () => {
    mongoose.connect(process.env.MONGODB_CONNECTION);
});

afterEach(async () => {
    await mongoose.connection.close();
});


const app = express();

app.use(express.json());

app.use('/user', user);
app.use(approuter);




describe("Home page", ()=>{
 it('should display the home page', async ()=>{
    const {res, statusCode} =   await request(app).get("/");  
expect(statusCode).toBe(200);
console.log(res.text);
    });
});




// describe("User signUp", ()=>{
//  it('Should register user', async ()=>{
//     const {body, statusCode} =   await request(app).post("/user/signup").send({
//         username: "Gretha",
//     email: "gretha@gmail.com",
//     password: "gretha",
//     role: "ADMIN"
//     });
// expect(statusCode).toBe(200);
// console.log(body);
//     });
// });




// describe("test for the user login", () =>{
//     it('login user', async() =>{
//         const {body, statusCode} = await request(app).post("/user/login").send({
//             email: "gretha@gmail.com",
//             password: "gretha"
//         });
//         expect(statusCode).toBe(200); 
//         console.log(body);  
//     });
// });




// describe("test for getting all events", () =>{
//     it('get all events', async() =>{
//         const {body, statusCode} = await request(app).get("/events").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTgwNWI4MTY4ZDZjZDIxNTVlNjE1In0sImlhdCI6MTY3OTkxNzM1OSwiZXhwIjoxNjc5OTIwOTU5fQ.kEk6h2WwSuOc_xP5RtQsTknkpicDxwGQi42mIRfVlC4'
//         ).query({userId: '6421805b8168d6cd2155e615'});
//         expect(statusCode).toBe(200); 
//         console.log(body);
//     }, 100000);
// });




// describe("test for getting an event", () =>{
//     it('get a single event', async() =>{
//         const {res, statusCode} = await request(app).get("/event/6419ea3457ce405bdfc244ec").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyNDY3OCwiZXhwIjoxNjc5OTI4Mjc4fQ.U_Rlm5V_1NXZSiAHB-9x4A1GKMsM-EzfaYVNu1lcPLo'
//         ).query({userId: '6419a3c5e91b72695b2d054c'});
//         expect(statusCode).toBe(200); 
//         console.log(res.text);
//     }, 100000);
// });




// describe("test for creating an event", () =>{
//     it('Create a new event', async() =>{
//         const {body, statusCode} = await request(app).post("/event").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyNDY3OCwiZXhwIjoxNjc5OTI4Mjc4fQ.U_Rlm5V_1NXZSiAHB-9x4A1GKMsM-EzfaYVNu1lcPLo'
//         ).send({
//             user: "6419e93d69ee8308fa076592",
//     eventname: "Painting event",
//     date: "2023-04-09",
//     time: "morning",
//     location: "Mount Olympus",
//     description: "A Painting event",
//     attendees: ["6419a56d7c2ace4ec7a9cde6"]
//         });
//         expect(statusCode).toBe(200); 
//         console.log(body);
//     }, 100000);
// });



// describe("test for creating an attendee", () =>{
//     it('should create an attendee', async() =>{
//         const {body, statusCode} = await request(app).post("/attendee").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkxNzcwMCwiZXhwIjoxNjc5OTIxMzAwfQ.GMxYdQDeyUvGNqQRRkS7tpPbuZ5wcqpXwa1sL8_VSRM'
//         ).send({name: "Rosie",
//                email: "Rosie@gmail.com"});
//         expect(statusCode).toBe(200); 
//         console.log(body);
//     }, 100000);
// });



// describe("test for updating an event", () =>{
//     it('should update an event', async() =>{
//         const {res, statusCode} = await request(app).patch("/event/64218793e6ca5514a505027c").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyNTIxNCwiZXhwIjoxNjc5OTI4ODE0fQ.hnWiQGgAr60tbyyuRs7IU0Fhiza4KaG4BVHr6qrv_fQ'
//         ).query({userId: "6419e93d69ee8308fa076592"}).send({location: "The Art Gallery"});
//         expect(statusCode).toBe(200); 
//         console.log(res.text);
//     }, 100000);
// });



// describe("test for adding an attendee", () =>{
//     it('should add an attendee to the event', async() =>{
//         const {res, statusCode} = await request(app).patch("/event/attendee/64218793e6ca5514a505027c").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyNTIxNCwiZXhwIjoxNjc5OTI4ODE0fQ.hnWiQGgAr60tbyyuRs7IU0Fhiza4KaG4BVHr6qrv_fQ'
//         ).query({userId: "6419e93d69ee8308fa076592"}).send({attendee: "64218832433144273adb6dde"});
//         expect(statusCode).toBe(200);
//            console.log(res.text); 
//     }, 100000);
// });



// describe("test for deleting an event", () =>{
//     it('should delete an event', async() =>{
//         const {res, statusCode} = await request(app).delete("/event/64218d2e1c2a62c48a797846").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkxNzcwMCwiZXhwIjoxNjc5OTIxMzAwfQ.GMxYdQDeyUvGNqQRRkS7tpPbuZ5wcqpXwa1sL8_VSRM'
//         ).query({userId: "6419e93d69ee8308fa076592"}).send({reason: 'Out dated event',
//     title: 'User'});
//         expect(statusCode).toBe(200); 
//         console.log(res.text);
//     }, 100000);
// });



// describe("test for deleting an attendee from event", () =>{
//     it('should delete an attendee from event', async() =>{
//         const {res, statusCode} = await request(app).delete("/remove/attendee/6419ea3457ce405bdfc244ec").set(
//             'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyMTQxNSwiZXhwIjoxNjc5OTI1MDE1fQ.cuNZwkKP1e6JbUfZv_s4qzDk9v5nOsJmLLyfY7JQvHk'
//         ).query({attendeeId: "6419a6275572f852f1140887",
//     userId: "6419a3c5e91b72695b2d054c"});
//         expect(statusCode).toBe(200); 
//         console.log(res.text);
//     }, 100000);
// });



// describe("test for approving or rejecting an event", () =>{
//         it('should reject or accept an event', async() =>{
//             const {res, statusCode} = await request(app).post("/event/status/6419ea3457ce405bdfc244ec").set(
//                 'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOWU5M2Q2OWVlODMwOGZhMDc2NTkyIn0sImlhdCI6MTY3OTkyMTQxNSwiZXhwIjoxNjc5OTI1MDE1fQ.cuNZwkKP1e6JbUfZv_s4qzDk9v5nOsJmLLyfY7JQvHk'
//             ).query({ userId: "6421805b8168d6cd2155e615"}).send({status: "Approved",
//         reason: "An educating event"});
//             expect(statusCode).toBe(200); 
//             console.log(res.text);
//         }, 100000);
//     });