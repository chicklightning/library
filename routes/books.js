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
     Author.findOne({authorLast: authorLast, authorFirst: authorFirst}, function (err, foundAuthor) {
          
          if(err) {
               console.log(err);
               res.redirect("/");
          }
          else {
               
               // if there is no such match, then create a new author
               if(foundAuthor == null)
               {
                    var newAuthor = {authorLast: authorLast, authorFirst: authorFirst };
                    Author.create(newAuthor, function(err, author) {
                         if(err)
                         {
                              console.log("Error creating author: " + err);
                              res.redirect("/");
                         }
                         else {
                              foundAuthor = author;
                         }
                    });
               }
               
               // // isbn filtering - remove dashes ("-") from string
               // if (isbn.indexOf('-') > -1) {
               //      isbn = isbn.replace('-', '');
               // }
               
               // wait for database to fully process query
               while(foundAuthor == null) {
                    setTimeout(function(){}, 100);    
               }
               
               console.log("New author created: " + foundAuthor.authorFirst + " " + foundAuthor.authorLast);
               
               // create a book using the found or created author
               var newBook = {
                    title: title,
                    image: image,
                    isbn: isbn,
                    seriesNum: seriesNum,
                    genre: genre,
               };
               
               // add book to database then redirect to book list
               Book.create(newBook, function(err, book) {
                    if(err)
                    {
                         console.log("Error creating book: " + err);
                         res.redirect("/books");
                    }
                    else {
                         
                         book.author.id = foundAuthor._id;
                         book.author.name = authorFirst + " " + authorLast;
                         book.save();
                         
                         // push book id to author
                         foundAuthor.books.push(book);
                         foundAuthor.save();
                         console.log("New book created: " + title + " by " + authorLast);
                         res.redirect("/books");
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
               res.redirect("/books");
          }
          else {
               res.render("books/show", {book: book});
          }
     });
});


// export
module.exports = router;