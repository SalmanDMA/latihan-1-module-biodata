const express = require('express');
const app = express();
const { port, db } = require('./config');
const biodataRouter = require('./routes/biodata');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.send(`<h1>Hello World !!!</h1>`);
});
app.use('/biodata', biodataRouter);

app.listen(port, () => {
 console.log(`Server running at http://${db}:${port}`);
});
