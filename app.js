// ------------------ //
// ---DEPENDENCIES--- //
// ------------------ //
var bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    expressSanitizer= require("express-sanitizer"),
    mongoose        = require("mongoose"),
    express         = require("express");

// app setup
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// ------------------ //
// -----MONGOOSE----- //
// ------------------ //
mongoose.connect("mongodb://localhost/library");
var Book    = require("./models/book");
var Author  = require("./models/author");


// ------------------ //
// ------ROUTES------ //
// ------------------ //
var bookRoutes      = require("./routes/books"),
    authorRoutes    = require("./routes/authors"),
    indexRoutes     = require("./routes/index");

app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);


// ------------------ //
// -----STARTUP------ //
// ------------------ //
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Library server started.");
});