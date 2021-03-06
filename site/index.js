var express = require('express');
var fs = require('fs');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('layout', 'layout'); // defaults to 'layout'
app.locals.code = function(args) {
    var contents = args[0]
        .trim()
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    return '<pre><code>' + contents + '</code></pre>';
};

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', { category: undefined });
});

app.get(/^[1-9a-z\/\-]+$/, function(req, res) {
    res.render(req.path.substr(1), { category: req.path.split('/')[1] });
});

app.listen(3000);
