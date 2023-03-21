const express = require('express');
const mongoose = require("mongoose");
const request = require('supertest');
const approuter = require('../../routes/routes');
const user = require('../../routes/user');
const nodemailer = require('nodemailer');
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


describe("Integration tests for the Events Api", ()=>{
 it('user signup', async ()=>{
    const {body, statusCode} =   await request(app).post("/user/signup").send({
        username: "Gretha",
    email: "Danielle@gmail.com",
    password: "Danielle",
    role: "ADMIN"
    });
expect(statusCode).toBe(200);
    });
});


describe("test for the user login", () =>{
    it('login user', async() =>{
        const {body, statusCode} = await request(app).post("/user/login").send({
            email: "dandeline@gmail.com",
            password: "dandeline"
        });
        expect(statusCode).toBe(200); 
        console.log(body);  
    });
});

describe("test for getting all events", () =>{
    it('get all events', async() =>{
        const {body, statusCode} = await request(app).get("/events").set(
            'token', 'eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOTc3OWVjYzA3Yjc3M2MwNzU5NGM5In0sImlhdCI6MTY3OTM5MzQ2MiwiZXhwIjoxNjc5Mzk3MDYyfQ.DAB2_CuGtFrSm9CnaTZi-Qh6YaRkh5yg1lQosQznPNw'
        ).query({userId: '6419772437ead291a0f3305b'});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});



describe("test for getting an event", () =>{
    it('/events', async() =>{
        const {body, statusCode} = await request(app).get("/event/64192309f5e7488ed2a97bea").set(
            'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOGM3MTQ2MDg5ZmJiYmRkNmNjZjkxIn0sImlhdCI6MTY3OTM5NzkzNywiZXhwIjoxNjc5NDAxNTM3fQ.QEQypGnB-1TWfOsSxCcdtp2c9l5--3s7KhgUWLJQCAw'
        ).query({userId: '6418c7146089fbbbdd6ccf91'});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});



describe("test for creating the attendee", () =>{
    it('should create an attendee', async() =>{
        const {body, statusCode} = await request(app).post("/attendee").set(
            'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOGM3MTQ2MDg5ZmJiYmRkNmNjZjkxIn0sImlhdCI6MTY3OTM5NjE5MiwiZXhwIjoxNjc5Mzk5NzkyfQ.Jp-AKcfLnEGd5WbJwn8mA8ojqmWP5q_J1uVLWLtJTy4'
        ).send({name: "Mongolia",
               email: "mongolia@gmail.com"});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});


describe("test for updating an event", () =>{
    it('should update an event', async() =>{
        const {body, statusCode} = await request(app).patch("/event/64198bc8704bc5da7f0fd583").set(
            'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOGM3MTQ2MDg5ZmJiYmRkNmNjZjkxIn0sImlhdCI6MTY3OTM5NjE5MiwiZXhwIjoxNjc5Mzk5NzkyfQ.Jp-AKcfLnEGd5WbJwn8mA8ojqmWP5q_J1uVLWLtJTy4'
        ).query({userId: "6418d35bbde5b45882e8a774"}).send({eventname: "Rainbow viewing"});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});



describe("test for adding an attendee", () =>{
    it('should add an attendee', async() =>{
        const {body, statusCode} = await request(app).patch("/event/attendee/64192309f5e7488ed2a97bea").set(
            'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOGM3MTQ2MDg5ZmJiYmRkNmNjZjkxIn0sImlhdCI6MTY3OTM5NzkzNywiZXhwIjoxNjc5NDAxNTM3fQ.QEQypGnB-1TWfOsSxCcdtp2c9l5--3s7KhgUWLJQCAw'
        ).query({userId: "6418c7146089fbbbdd6ccf91"}).send({attendee: "6415902314a28919a12e06df"});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});


describe("test for deleting an event", () =>{
    it('should delete an event', async() =>{
        const {body, statusCode} = await request(app).patch("/event/64192309f5e7488ed2a97bea").set(
            'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxOGM3MTQ2MDg5ZmJiYmRkNmNjZjkxIn0sImlhdCI6MTY3OTM5NzkzNywiZXhwIjoxNjc5NDAxNTM3fQ.QEQypGnB-1TWfOsSxCcdtp2c9l5--3s7KhgUWLJQCAw'
        ).query({userId: "6418c7146089fbbbdd6ccf91"}).send({reason: 'Out dated event'});
        expect(statusCode).toBe(200); 
        console.log(body);
    }, 100000);
});
