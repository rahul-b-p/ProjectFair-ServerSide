const users = require("../model/userModel");

const jwt = require("jsonwebtoken")



// register
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json('Account already exists')
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                linkedin: "",
                github: "",
                profile: ""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(`registration faild due to ${error}`)
    }
}

// login
exports.loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'mmmThurakk')
            res.status(200).json({ existingUser, token })
        }
        else {
            res.status(406).json('Invalid emalID or Password')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit profile
exports.editProfileController = async (req, res) => {
    const userId = req.payload
    const {username,email,password,linkedin,github,profile} = req.body
    const profileImage = req.file?req.file.filename:profile

    try {

        const userProfile = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,linkedin,github,profile:profileImage
        })

        await userProfile.save()
        res.status(200).json(userProfile)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

