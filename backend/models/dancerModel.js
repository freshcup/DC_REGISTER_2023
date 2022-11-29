const mongoose = require('mongoose');

const dancerSchema = mongoose.Schema(
    {
    
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
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

const Dancer = mongoose.model("Dancer", dancerSchema);

module.exports = Dancer;
