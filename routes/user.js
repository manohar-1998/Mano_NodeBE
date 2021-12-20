const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser, getAllUsers, updateUser} = require("../controllers/user");

router.param("userId",getUserById);
router.get("/users",getAllUsers);
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

module.exports = router;