const   express = require('express'),
        app = express(),
        port = process.env.PORT || 3000,
        bodyParser = require('body-parser');
  

// CONFIGURE APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// SET ROUTES
require('./api/routes/route')(app);
require('./api/routes/db')();


// CONFIGURE EXPRESS
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



// MAINPAGE
app.get('/', async (req, res) => {
    res.render('index', {title: 'Product API'});
});

// START APP
app.listen(port, () => console.log(`Listening on port ${port}...`));