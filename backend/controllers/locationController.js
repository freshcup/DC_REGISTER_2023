const expressAsyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");

const getLocations = expressAsyncHandler( async (req, res) => {
    const locations = await Location.find({user: req.user._id})
    res.json(locations);
});

const CreateLocation = expressAsyncHandler(async (req, res) => {
    const {city, routineNames} = req.body;

    if (!city || !routineNames ) {
        res.status(400)
        throw new Error("Please fill in all the fields");
    } else {
        const location = new Location({ user: req.user._id, city, routineNames });

        const createdLocation = await location.save();

        res.status(201).json(createdLocation);
    }
});

const getLocationById = expressAsyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id);
   
    if (location) {
        res.json(location);
   } else {
        res.status(404).json({ message: "Location not found" });
   }
   res.json(location);
});

const UpdateLocation = expressAsyncHandler(async (req, res) => {
    const {city, routineNames } = req.body;
    const location = await Location.findById(req.params.id);

if(location.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

    if (location) {
        location.city = city;
        location.routineNames = routineNames;
  

    
        const UpdateLocation = await location.save()
        res.json(UpdateLocation);
    } else {
         throw new Error("Location not found");
    }

});

const DeleteLocation = expressAsyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id);

    if(location.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

     if (location) {
        await location.remove();
        res.json({ message: "Location Removed" });
     } else {
         res.status(404).json({ message: "Location not found" });
     }
})

module.exports = { getLocations, CreateLocation, UpdateLocation, DeleteLocation, getLocationById };