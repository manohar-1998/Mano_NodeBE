const User = require("../models/user")
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt')
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // Throw a 400 error if the email address already exists
            return res
                .status(400)
                .json({ email: "User has already registered with this Email" });
        } else {
            const payload = {
                // id: user.id,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                lastname: req.body.lastname,
                role: req.body.role
            };
            const token = jwt.sign(payload, process.env.SECRET)
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                lastname: req.body.lastname,
                role: req.body.role,
                token: token
            });
            if(newUser){
                console.log("User Created Successfully...")
            }else{
                console.log("User NOt created")
            }
            //salt to encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(() => res.json({
                            success: true,
                            token: token,
                            user: newUser
                        }))
                        .catch(err => console.log(err));
                });
            });
        }
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    console.log("====", req.body)
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with this Email Not Registered in DB"
            })
        }
             bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    const payload = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                    jwt.sign(
                        payload,
                        process.env.SECRET,
                        (err, token) => {
                            res.json({
                                success: true,
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                }
                            });
                        }
                    );
                }
                else {
                    res.status(401).json({ error: "In-Correct Password" });
                }
            })
        })
    }

        exports.signout = (req, res) => {
            res.clearCookie("token")
            res.json({
                message: 'User Signed Out Successfully'
            })
        };

        exports.isSignedIn = expressJwt({
            secret: process.env.SECRET,
            userProperty: "auth",
            algorithms: ['HS256']
        })

        exports.isAuthenticated = (req, res, next) => {
            console.log("Req Check==",req,"Res==",res,"REq.params=",req.params)
            let checker = req.profile && req.auth && req.profile._id == req.params.userId;
            if (!checker) {
                return res.status(403).json({
                    error: "ACCESS DENIED"
                });
            }
            next();
        }

        exports.isAdmin = (req, res, next) => {
            if (req.profile.role === 0) {
                return res.status(403).json({
                    error: "You are not ADMIN, Access Denied"
                });
            }
            next();
        }