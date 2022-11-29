const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
    {
    
        city: {
            type: String,
            required: true,
        },
        routineNames: {
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

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;