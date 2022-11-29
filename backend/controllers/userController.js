const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req,res) => {
    const { studio, email, address, phone, contact, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404)
        throw new Error("Email already exists");
    }

    const user = await User.create ({
        studio,
        email,
        address,
        phone,
        contact,
        password
    });

    if(user) {
        res.status(201).json({
            _id:user._id,
            studio:user.studio,
            email:user.email,
            address:user.address,
            phone:user.phone,
            contact:user.contact,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Error Occured!');
    }
});



const authUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
             _id:user._id,
            studio:user.studio,
            email:user.email,
            address:user.address,
            phone:user.phone,
            contact:user.contact,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password!');
    }
 
});


const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.studio = req.body.studio || user.studio;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone;
        user.contact = req.body.contact || user.contact;

        if(req.body.password)
            user.password = req.body.password;
   
    const updatedUser = await user.save();

    res.json({
        _id:updatedUser._id,
        studio:updatedUser.studio,
        email:updatedUser.email,
        address:updatedUser.address,
        phone:updatedUser.phone,
        contact:updatedUser.contact,
        token:generateToken(updatedUser._id)
    });
    }  else {
        res.status (404)
        throw new Error("User not found!");

    }
});

module.exports = { registerUser, authUser, updateUserProfile };