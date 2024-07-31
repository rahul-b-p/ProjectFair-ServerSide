// multer

// 1)import multer 
const multer = require('multer')

//2) store file
const storage =multer.diskStorage({
    // where the file is sorted
    destination:(req,file,callback)=>{
        callback(null,'./uploads') //path in which the file is stored
    },
    // by which name the file should be sorted
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}` //format of setting filename
        callback(null,filename) //setting file name
    }
})

const fileFilter =(req,file,callback)=>{
    if( file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' ){
        callback(null, true)
    }
    else{
        callback(null,false)
        return callback (new Error('Only png,jpeg,jpg files are accepted'))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig