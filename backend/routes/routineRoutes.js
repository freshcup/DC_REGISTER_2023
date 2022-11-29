const express = require("express");
const { getRoutines, CreateRoutine, getRoutineById, UpdateRoutine, DeleteRoutine } = require("../controllers/routineController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getRoutines)
router.route('/create').post(protect, CreateRoutine)
router.route('/:id').get(getRoutineById).put(protect, UpdateRoutine).delete(protect, DeleteRoutine);



module.exports = router;
