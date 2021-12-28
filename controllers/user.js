const User = require("../models/user")

exports.getUserById = (req, res) => {
    User.findById(req.params.userId).select('-password').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found in DB"
            })
        };
        req.profile = user;
        return res.json(req.profile)
    });
};

exports.getUser = (req, res) => {
    // As confidential data need to hide by displaying in postman or view part from user Data
    req.profile.password = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req,res)=>{
    User.find().select('-password').exec((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error:"No Users Noticed"
            });
        }
        return res.json(users);
    });
};

exports.updateUser = (req,res)=>{
    const updates = req.body;
    const options = { new: true }
    User.findByIdAndUpdate(req.params.userId, updates, options, (err, user) =>{
            if(err || !user){
                return res.status(400).json({
                    error:"Not Authorized to Update the Profile"
                })
            }
            res.json(user);
        }
    )
}

exports.deleteUser = (req,res)=>{
    User.findByIdAndDelete(req.params.userId,(err,result)=>{
        if(!result){
            return res.status(404).json({
                error:"Error while Deleting the User from DB"
            })
        }
        else{
            res.status(200).json({
                message:"User Deleted SUccessfully..."
            })
        }
    })
}