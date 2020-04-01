const   express = require('express'),
        app = express(),
        port = process.env.PORT || 3000,
        bodyParser = require('body-parser'),
        saveToDB = require('./db/save_products.js');
  

// CONFIGURE APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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