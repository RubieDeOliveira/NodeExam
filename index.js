const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes/movies');

app.use(express.json());

app.get("/", (req, res) => 
    res.send('Welcome to happy movies world !')
);

app.use('/api/movies', routes);

app.listen(port, () => console.log(`Listening to socks on port ${port}`));
