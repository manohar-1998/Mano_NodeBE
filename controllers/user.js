const User = require("../models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found in DB"
            })
        };
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    // As confidential data need to hide by displaying in postman or view part from user Data
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req,res)=>{
    User.find().exec((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error:"No Users Noticed"
            });
        }
        res.json(users);
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
            user.salt=undefined;
            user.encry_password=undefined;
            res.json(user);
        }
    )
}