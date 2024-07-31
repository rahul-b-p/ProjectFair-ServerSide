// middleware is used to verify jsonbrowsertoken

const jwt = require('jsonwebtoken')


const jwtMiddleware =(req,res,next)=>{
    // logic
    console.log('Inside jwt middleware');
    // access token
    const token = req.headers["authorization"].split(' ')[1]
    // console.log(token);

    // verify
    try {
        const jwtResponse = jwt.verify(token,'mmmThurakk')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(406).json('Authorization failed ......... PLease Login',error)
    }
}

module.exports= jwtMiddleware