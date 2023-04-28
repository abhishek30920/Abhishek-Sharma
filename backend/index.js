const connectTomongo=require('./db')
const express = require('express')
const cors = require("cors");
connectTomongo();
const app = express()
const port = 8000

app.use(express.json())
app.use(cors());
app.use('/api',require('./routes/appRoutes'))
//app.use('api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
