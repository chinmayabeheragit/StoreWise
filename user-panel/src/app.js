const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cors = require('cors');

const Router = require('../src/routers/router')
const helmet = require('helmet')
dotenv.config({path:'./config/dev.env'})
require('./db/mongoose')
const contextPath = '/rest/api'
const app = express();
app.use(cors({
    origin: '*'
}))

const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./swagger/swagger')(app)
app.use(helmet());
app.use(cors())
app.use(contextPath,Router)
app.get('/', (req,res) =>{
    res.send('welcome to the Billing App');
})
app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`)
})