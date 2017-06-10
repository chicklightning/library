var mongoose = require("mongoose");
var Book = require("./book.js");

// Author schema
// each author has a first name, last name, image, and list of associated books
var authorSchema = new mongoose.Schema({

     authorLast: String,
     authorFirst: String,
     image: {
          type: String,
          default: "https://yt3.ggpht.com/-X0KJO_44Vt0/AAAAAAAAAAI/AAAAAAAAAAA/xswBnEQUkIY/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
     },
     books: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Book"
      }
     ]

});

module.exports = mongoose.model("Author", authorSchema);
