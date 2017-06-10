var  express   = require("express"),
     router    = express.Router(),
     Book      = require("../models/book"),
     Author    = require("../models/author");


// FULL LIST OF BOOKS
router.get("/", function (req, res) {
     
     // get all books from database
     Book.find({}, function(err, books) {
          if(err)
               console.log("Error getting books from DB: " + err);
          else
               res.render("books/index", {books: books});
     });
});


// CREATE BOOK
router.post("/", function(req, res) {
     
     // get data from book form
     var  title          = req.body.title,
          image          = req.body.image,
          authorFirst    = req.body.first,
          authorLast     = req.body.last,
          isbn           = req.body.isbn,
          seriesNum      = req.body.num,
          genre          = req.body.genre,
          read           = req.body.read;
     
     // search for author in database
     Author.findOne({authorLast: authorLast, authorFirst: authorFirst}, function (err, author) {
          if(err) {
               console.log(err);
               res.redirect("/");
          }
          else {
               var newAuthor = author;
               // if there is no such match, then create a new author
               if(author == null)
               {
                    newAuthor = {authorLast: authorLast, authorFirst: authorFirst };
                    Author.create(newAuthor, function(err, book) {
                         if(err)
                         {
                              console.log("Error creating author: " + err);
                              res.redirect("/");
                         }
                         else {
                              console.log("New author created: " + authorFirst + " " + authorLast);
                         }
                    });
               }
               
               // create a book using the found or created author
               var newBook = {
               title: title,
               authorId: newAuthor._id,
               image: image,
               isbn: isbn,
               seriesNum: seriesNum,
               genre: genre,
               read: read
               };
               
               // add book to database then redirect to book list
               Book.create(newBook, function(err, book) {
                    if(err)
                    {
                         console.log("Error creating book: " + err);
                         res.redirect("/");
                    }
                    else {
                         // push book id to author
                         newAuthor.books.push(book._id);
                         newAuthor.save();
                         console.log("New book created: " + title + " by " + authorLast);
                         res.redirect("/");
                    }
               });
          }
     });
});


// NEW BOOK form
router.get("/new", function (req, res) {
     // render form for new book
     res.render("books/new");
});


//SHOW BOOK single book info
router.get("/:id/", function (req, res) {
     
     // find book by id
     Book.findById(req.params.id, function(err, book) {
          if(err)
          {
               console.log("Error retrieving book." + req.params.id);
               res.redirect("/");
          }
          else {
               res.render("books/show", {book: book});
          }
     });
});


// export
module.exports = router;