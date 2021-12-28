const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser, getAllUsers, updateUser, deleteUser} = require("../controllers/user");

// router.param("userId",getUserById);
router.get("/users",getAllUsers);
router.get("/getuser/:userId",isAuthenticated,getUserById);
router.put("/user/:userId",isAdmin,isAuthenticated,updateUser);
router.delete("/user/:userId",isAuthenticated,deleteUser)

module.exports = router;