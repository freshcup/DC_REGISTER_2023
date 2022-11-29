const express = require("express");
const { getLocations, CreateLocation, getLocationById, UpdateLocation, DeleteLocation } = require("../controllers/locationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getLocations)
router.route('/create').post(protect, CreateLocation)
router.route('/:id').get(getLocationById).put(protect, UpdateLocation).delete(protect, DeleteLocation);



module.exports = router;
