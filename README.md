# Interactive Heatmap

This program grabs IP Address from a CSV file and display a heatmap of their respective locations.

Currently, the application runs slow due to handling JSON data. There is an attempt to use Protocol Buffers in the API to speed up data transfers. Will update. 

Working with [Leaflet](https://leafletjs.com/) & [MapBox](https://www.mapbox.com/)

Create your own MapBox [API Token](https://account.mapbox.com/auth/signin/?route-to=%22https://account.mapbox.com/access-tokens/%22)
    - Once created, create a .env file with a variable name "ACCESS_TOKEN" that is assigned to your API Token
