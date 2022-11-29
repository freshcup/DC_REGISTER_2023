const express = require("express");
const { getDancers, CreateDancer, getDancerById, UpdateDancer, DeleteDancer } = require("../controllers/dancerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getDancers)
router.route('/create').post(protect, CreateDancer)
router.route('/:id').get(getDancerById).put(protect, UpdateDancer).delete(protect, DeleteDancer);



module.exports = router;
