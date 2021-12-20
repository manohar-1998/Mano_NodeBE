var express = require('express');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');
var router = express.Router()

router.post("/signup", signup);

router.post("/signin",signin);

router.get("/signout", signout);
router.get("/testroute", isSignedIn,(req,res)=>{
    res.send("It's a Protected Route...")
});
module.exports = router;