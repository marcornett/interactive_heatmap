require('dotenv').config()
const express = require('express')
const cors = require('cors')
const csv = require('csv-parser')
const fs = require('fs')
const Schema = require('./utils/ip_address_pb')

// Start App
const app = express()
const port = process.env.PORT || 4000
let dataIP = []

// Middleware
app.use(express.json())
app.use(cors())

app.get('/token', (req, res) => {
    try{
        res.send(process.env.ACCESS_TOKEN)
    } catch(err){
        console.error(err)
        res.sendStatus(500).send('Internal server error.')
    }
    
})

app.get('/data', async (req, res) =>{
    let id = 1
    try{
        fs.createReadStream('./data/GeoLite2-City-Blocks-IPv4.csv')
        .pipe(csv())
        .on('data', (data) => {

            // Attempt at Protocol Buffers
            const address = new Schema.IP_Address()
            // Set Id
            address.setId(id)
            id++
            // Set Data
            address.setLatitude(data['latitude'])
            address.setLongitude(data['longitude'])
            address.setIntensity
            // Group addresses
            const addresses = new Schema.IP_Addresses()
            addresses.addIpAddress(address)
            // Serialize
            let bytes = addresses.serializeBinary()
            // dataIP.push(bytes)

            dataIP.push({
                'latitude': data['latitude'], 
                'longitude': data['longitude']
            })
        })
        .on('end', () => {
            res.send(dataIP)
        })
    } catch(err){
        console.error('Issue collecting data.', err)
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})