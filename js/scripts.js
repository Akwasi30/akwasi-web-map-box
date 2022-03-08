
mapboxgl.accessToken= 'pk.eyJ1IjoiYWt3YXNpMzAiLCJhIjoiY2t6aG5wN2Q1NDNndTJvcDQ0ZzBkbzQyOSJ9.Om7ek_mM4fe3ClIt_IrOIw'

// lngLat New York University
var nyu = [-73.997453,40.730842]

var map = new mapboxgl.Map({
  container:'mapContainer', // HTML container id
  style:'mapbox://styles/mapbox/dark-v9', // style URL
  center: nyu, //starting position as [lng, lat]
  maxzoom: 11
  //minZoom: 9,
  // maxZoom:14,


});

map.on ('load', function () {
map.addSource('akwasi-study-area', {
type: 'geojson',
//Use a URL for the value for the data property.
data: '/data/akwasi-study-area.geojson'
});

map.addSource('earthquakes', {
type: 'geojson',
//Use a URL for the value for the data property.
data: '/data/earthquakes.geojson'
});

map.addSource('traderjoesstores', {
type: 'geojson',
//Use a URL for the value for the data property.
data: '/data/traderjoesstores.geojson'
});

map.setPaintProperty('akwasi-study-area-fill', 'fill-color', [
  'match',
  ['get', 'LandUse'],
  '01','#ff94c9',
  '02','#a024ff',
  '03','#d6d600',
  '04','#ffde24',
  '05','#ffe552',
  '06','#ffff52',
  '07','#d60000',
  '08', '#00FFFF',
  '09','#00d100',
  '10','#df6a9f',
  '11','#24ffff',
  '12','#a024ff',
  /* other */ '#FFFFFF'
]);

map.addLayer({
'id': 'earthquakes-circle',
'type': 'circle',
'source': 'earthquakes',
'paint': {
  'circle-color': 'crimson',
}
});
})

// lngLat New York University
var nyu = [-73.997453,40.730842]


$.getJSON('./data/community-districts.geojson', function(rawData) {

//convert pop2010 property from a string to a number so we can use it
//for a choropleth map
 var cleanData =rawData
  cleanData.features= cleanData.features.map(function (feature) {
    var cleanFeature= feature
    cleanFeature.properties.pop2010 =parseInt(cleanFeature.properties.pop2010)
    return cleanFeature

})
map.on ('load', function () {
map.addSource('community-districts', {
type: 'geojson',
data: cleanData
})
map.addLayer({
id: `community-districts-fill`,
type: 'fill',
source: 'community-districts',
paint: {
'fill-color':[
'interpolate',
['linear'],
['get', 'pop2010'],
0,
'#f1eef6',
50000,
'#bdc9e1',
100000,
'#74a9cf',
150000,
'#2b8cbe',
200000,
'#045a8d',
5000000,
'#B86B25',
]
}
});
})



})
