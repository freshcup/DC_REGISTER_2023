const mongoose = require('mongoose');

const routineSchema = mongoose.Schema(
    {
    
        dclass: {
            type: String,
            required: true,
        },
        dform: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        length: {
            type: String,
            required: true,
        },
        numDancers: {
            type: String,
            required: true,
        },
        names: {
            type: Array, 
             items: {type: "string"},
             required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        
    },
    {
        timestamps: true,
    }
);

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
