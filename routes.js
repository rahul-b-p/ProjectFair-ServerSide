// 1) import express
const express = require('express')

// import userController
const userController = require('./controller/userController')

// import projectController
const projectController = require ('./controller/projectController')

// import jwt token
const jwt = require('./middleware/jwtMiddleware')

// import multer
const multerConfig = require('./middleware/multerMiddleware')

// 2) create an object for router class
const router = new express.Router()


// 3) set up path for each request from queue

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add Project
router.post('/addproject',jwt,multerConfig.single('projImage'),projectController.addProjectController)

// all projects
router.get('/allprojects',jwt,projectController.allProjectController)

// home projects
router.get('/homeprojects',projectController.homeProjectController)

// user projects
router.get('/userprojects',jwt,projectController.userProjectsController)

// delete project
router.delete('/delete/:id',projectController.deleteProjectController)

// edit project
router.put('/editproject/:id',jwt,multerConfig.single('projImage'),projectController.editProjectController)

// edit profile
router.put('/updateprofile',jwt,multerConfig.single('profile'),userController.editProfileController)


// 4) export the router
module.exports = router