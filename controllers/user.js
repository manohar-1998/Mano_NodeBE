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
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new : true, useFindAndModify: false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Not Authorized to Update the Profile"
                })
            }
            res.json(user);
        }
    )
}