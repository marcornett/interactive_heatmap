const baseUrl = 'http://localhost:4000'
const myMap = L.map('mapid').setView([0, 0], 2)

const createMap = (token, data) => {
    // TODO Create neccessary funcs 'addMarker', 'addCircle', 'addPolygon'
    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {
        attribution: `
            Map data &copy; 
            <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap
            </a> 
            contributors, Imagery © 
            <a href="https://www.mapbox.com/">
                Mapbox
            </a>`,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: token
    }).addTo(myMap)
}

const getDataIP = async () => {
    let data
    try{
        const response = await fetch(`${baseUrl}/data`)
        data = await response.json()
    }catch(err){
        console.error('Issue getting data for IP addresses.', err)
    } finally{
        return data
    }
}

const main = async () => {
    let token
    try{    
        const response = await fetch(`${baseUrl}/token`)
        token = await response.text()
    } catch(err){
        console.error('Issue getting token for map.', err)
    } finally{
        let data = await getDataIP()
        createMap(token, data)
    }
} 

main()

let marker = L.marker([51.5, -0.09]).addTo(myMap)
let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(myMap)
let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(myMap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
