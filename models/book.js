var mongoose = require("mongoose");

// Book schema
// each book has a title, author first and last name, image, isbn, book number in series
// (if applicable), a genre, and whether or not I've read it
var bookSchema = new mongoose.Schema({

    title: String,
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
    },
    image: {
        type: String,
        default: "http://cliparts.co/cliparts/8Tx/rEq/8TxrEqnGc.svg"
    },
    isbn: String,
    seriesNum: Number,
    genre: String,
    read: Boolean

});

module.exports = mongoose.model("Book", bookSchema);