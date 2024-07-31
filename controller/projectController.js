const projects = require("../model/projectModel");


// addproject
exports.addProjectController=async(req,res)=>{
    console.log('inside addProject Functon');
    const userId = req.payload
    console.log(userId);
    const {title, language, github, website, overview} = req.body
    const projImage = req.file.filename

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exist')
        }
        else{
            const newProject = new projects({
                title, language, github, website, overview, projImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}


// get all projects
exports.allProjectController =async(req,res)=>{
    const searchKey = req.query.search
    // console.log(searchKey);
    try {

        const query = {
            language : {$regex:searchKey,$options:'i'}
        }
        
        const allProjects = await projects.find(query)
        if(allProjects){
            res.status(200).json(allProjects)
        }
        else{
            res.status(406).json('No projects exists')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get first three projects
exports.homeProjectController =async(req,res)=>{

    try {
        const homeProject = await projects.find().limit(3)
        if (homeProject){
            res.status(200).json(homeProject)
        }
        else{
            res.status(406).json('No projects exists')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get user projects
exports.userProjectsController =async(req,res)=>{
    const userId = req.payload

    try {
        const userProject = await projects.find({userId})
        if(userProject){
            res.status(200).json(userProject)
        }
        else{
            res.status(406).json('User has no projects')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete projects
exports.deleteProjectController =async(req,res)=>{
    console.log('Inside Delete Function');
    const {id} = req.params
    console.log(id);

    try {
        // deleteOne -return true or false
        // findByIdAndDelete - return doccument
        const project = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(project)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit project
exports.editProjectController =async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title, language, github, website, overview, projImage} = req.body

    const uploadedImage = req.file?req.file.filename: projImage

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,language,github,website,overview,projImage:uploadedImage,userId
        })
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }
}