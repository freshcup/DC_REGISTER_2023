const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const dancerRoutes = require("./routes/dancerRoutes");
const routineRoutes = require("./routes/routineRoutes");
const locationRoutes = require("./routes/locationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());



app.use('/api/users', userRoutes);
app.use('/api/dancers', dancerRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/locations', locationRoutes);

///------------- deployment --------------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/dc-reg_frontend/build" )))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "dc-reg_frontend", "build", "index.html" ))
    })
} else {
    app.get('/', (req,res) => {
    res.send("API is Running");
});
}

///------------- deployment --------------------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
