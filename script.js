const baseUrl = 'http://localhost:4000'
const myMap = L.map('mapid').setView([0, 0], 2)

const createMap = (token, data) => {
    let dataArr = []
    data?.forEach(pair => {
        dataArr.push(Object.values(pair))
    })
    try {
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
        
        L.heatLayer(dataArr, {radius: 8}).addTo(myMap);
    } catch (err) {
        console.error('Issue creating map.', err)
    }
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