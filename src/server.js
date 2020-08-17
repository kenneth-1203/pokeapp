
const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

app.use(cors());

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})