const expressAsyncHandler = require("express-async-handler");
const Routine = require("../models/routineModel");

const getRoutines = expressAsyncHandler( async (req, res) => {
    const routines = await Routine.find({user: req.user._id})
    res.json(routines);
});

const CreateRoutine = expressAsyncHandler(async (req, res) => {
    const {dclass, dform, category, age, title, length, numDancers, names } = req.body;

    if (!dclass || !dform || !category || !age || !title || !numDancers || !names ) {
        res.status(400)
        throw new Error("Please fill in all the fields");
    } else {
        const routine = new Routine({ user: req.user._id, dclass, dform, category, age, title, length, numDancers, names });

        const createdRoutine = await routine.save();

        res.status(201).json(createdRoutine);
    }
});

const getRoutineById = expressAsyncHandler(async (req, res) => {
    const routine = await Routine.findById(req.params.id);
   
    if (routine) {
        res.json(routine);
   } else {
        res.status(404).json({ message: "Routine not found" });
   }
   res.json(routine);
});

const UpdateRoutine = expressAsyncHandler(async (req, res) => {
    const {dclass, dform, category, age, title, length, numDancers, names } = req.body;
    const routine = await Routine.findById(req.params.id);

if(routine.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

    if (routine) {
        routine.dclass = dclass;
        routine.dform = dform;
        routine.category = category;
        routine.age = age;
        routine.title = title;
        routine.length = length;
        routine.numDancers = numDancers;
        routine.names = names;

    
        const UpdateRoutine = await routine.save()
        res.json(UpdateRoutine);
    } else {
         throw new Error("Routine not found");
    }

});

const DeleteRoutine = expressAsyncHandler(async (req, res) => {
    const routine = await Routine.findById(req.params.id);

    if(routine.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
    }

     if (routine) {
        await routine.remove();
        res.json({ message: "Routine Removed" });
     } else {
         res.status(404).json({ message: "Routine not found" });
     }
})

module.exports = { getRoutines, CreateRoutine, UpdateRoutine, DeleteRoutine, getRoutineById };