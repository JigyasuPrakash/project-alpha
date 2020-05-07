const express = require('express');
const nunjucks = require('nunjucks');
const apiRouter = require('./routes/api/ApiRouter');
const pageRouter = require('./routes/page/pageRouter');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/public'));

// App routes
app.get('/servertest', (req, res) => {
    res.send("Server working!");
});

app.use('/api', apiRouter);
app.use('/', pageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server Started at port ${PORT}`) });