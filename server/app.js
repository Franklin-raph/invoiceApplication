const express = require('express')
const db = require('./config/dbConfig')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


const app = express()

app.use(morgan("dev"));
app.use(express.json())
app.use(cors())
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/clienbillinfo', require('./routes/clientBillInfoRoutes'))

app.get("/", (req, res) => {
    res.send("Home route");
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    db.dbConnectionMethod()
    console.log(`App started on port ${PORT}`)
})