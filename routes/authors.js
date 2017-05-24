var  express   = require("express"),
     router    = express.Router(),
     Book      = require("../models/book"),
     Author    = require("../models/author");

// no route to see all authors, didn't want to have that

// no route to create single author, done through book routes
// i.e. if author exists, add it to book, otherwise, create author


//SHOW AUTHOR single author info
router.get("/authors/:id/", function (req, res) {
     
     // find author by id
     Author.findById(req.params.id, function(err, author) {
          if(err)
          {
               console.log("Error retrieving author: " + req.params.id);
               res.redirect("/books");
          }
          else {
               res.render("authors/show", {author: author});
          }
     });
});


// export
module.exports = router;