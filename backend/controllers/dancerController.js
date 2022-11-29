const expressAsyncHandler = require("express-async-handler");
const Dancer = require("../models/dancerModel");

const getDancers = expressAsyncHandler( async (req, res) => {
    const dancers = await Dancer.find({user: req.user._id})
    res.json(dancers);
});

const CreateDancer = expressAsyncHandler(async (req, res) => {
    const {last, first, birthdate, age } = req.body;

    if (!last || !first || !birthdate || !age ) {
        res.status(400)
        throw new Error("Please fill in all the fields");
    } else {
        const dancer = new Dancer({ user: req.user._id, last, first, birthdate, age });

        const createdDancer = await dancer.save();

        res.status(201).json(createdDancer);
    }
});

const getDancerById = expressAsyncHandler(async (req, res) => {
    const dancer = await Dancer.findById(req.params.id);
   
    if (dancer) {
        res.json(dancer);
   } else {
        res.status(404).json({ message: "Dancer not found" });
   }
   res.json(dancer);
});

const UpdateDancer = expressAsyncHandler(async (req, res) => {
    const { last, first, birthdate, age } = req.body;
    const dancer = await Dancer.findById(req.params.id);

if(dancer.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

    if (dancer) {
        dancer.last = last;
        dancer.first = first;
        dancer.birthdate = birthdate;
        dancer.age = age;
   
     

    
        const UpdateDancer = await dancer.save()
        res.json(UpdateDancer);
    } else {
         throw new Error("Dancer not found");
    }

});

const DeleteDancer = expressAsyncHandler(async (req, res) => {
    const dancer = await Dancer.findById(req.params.id);

    if(dancer.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

     if (dancer) {
        await dancer.remove();
        res.json({ message: "Dancer Removed" });
     } else {
         res.status(404).json({ message: "Dancer not found" });
     }
})

module.exports = { getDancers, CreateDancer, UpdateDancer, DeleteDancer, getDancerById };