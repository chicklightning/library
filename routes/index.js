var  express   = require("express"),
     router    = express.Router();


//root route
router.get("/", function (req, res) {
     res.render("landing");
});


// export
module.exports = router;