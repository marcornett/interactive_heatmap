require('dotenv').config()
const express = require('express')
const cors = require('cors')
const csv = require('csv-parser')
const fs = require('fs')

// Start App
const app = express()
const port = process.env.PORT || 4000
let dataIP = []

// Middleware
app.use(express.json())
app.use(cors())

app.get('/token', (req, res) => {
    // TODO Check if authorized
    try{
        res.send(process.env.ACCESS_TOKEN)
    } catch(err){
        console.error(err)
        res.sendStatus(500).send('Internal server error.')
    }
    
})

app.get('/data', async (req, res) =>{
    let boundingBox // TODO Define Bounding Box
    try{
        fs.createReadStream('../data/test.csv')
        .pipe(csv())
        .on('data', (data) => {
            dataIP.push({
                'latitude': data['latitude'], 
                'longitude': data['longitude']
            })
        })
        .on('end', () => {
            res.send(dataIP)
        })
    } catch(err){
        console.error('Issue collecting CSV data.', err)
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})