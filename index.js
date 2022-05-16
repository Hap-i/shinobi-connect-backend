const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./router/userRouter')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
require('dotenv').config();
// security middleware
app.use(helmet());

// Middleware
// Third party Middkeware  --> this shows the proper req made in log
app.use(morgan('dev'));

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);

mongoose.connect(process.env.MONGO_URL, {})
    .then((result) => console.log("DB connection Successful!"))
    .catch((err) => console.log(err))


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})