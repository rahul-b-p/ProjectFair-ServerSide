// import dotenv -to load enviromental variable
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./routes')

// const app = require('./middleware/appMiddleware)

// import connection
require('./connection')


// create express server
const pfServer = express()

// use of cors - to communicate with the view
pfServer.use(cors())

// use json method - returns a middleware which can parse json formate
pfServer.use(express.json())

// pfServer.use(app)

// use of router
pfServer.use(router)

// exporting images in uploads
pfServer.use('/uploads',express.static('./uploads'))


// set a port for the server
PORT = 4000 || process.env.PORT

// listen to the port to resolve the request
pfServer.listen(PORT, () => {
    console.log(`server running successfully at port number:${PORT}`);
})

// get request
/*pfServer.get('/',(req,res)=>{
    // logic
    res.send('get request received')
})*/

// post request
/*pfServer.post('/',(req,res)=>{
    // logic
    res.send('post request received')
})*/

// put request
/*pfServer.put('/',(req,res)=>{
    // logic
    res.send('put request received')
})*/

// delete request
/*pfServer.delete('/',(req,res)=>{
    // logic
    res.send('delete request received')
})*/