require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Start App
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(cors())

app.get('/token', (req,res) => {
    // Check if authorized
    try{
        res.send(process.env.ACCESS_TOKEN)
    } catch(err){
        console.error(err)
        res.sendStatus(500).send('Internal server error.')
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})