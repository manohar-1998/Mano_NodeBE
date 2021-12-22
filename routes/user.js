const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser, getAllUsers, updateUser} = require("../controllers/user");

// router.param("userId",getUserById);
router.get("/users",getAllUsers);
router.get("/getuser/:userId",isAuthenticated,getUserById);
router.put("/user/:userId",isAuthenticated,updateUser);

module.exports = router;