// Legend
require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], (
  Map,
  CSVLayer,
  MapView,
  Legend
) => {
   // URL
  var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
// Popup
  const template = {
   title: "Crime committed at {ILEADSStreet}"
};
// Heatmap
  const renderer = {
  type: "heatmap",
  colorStops: [
    { color: "rgba(0, 255, 0, 0)", ratio: 0 },  
    { color: "rgba(255, 0, 0, 0.5)", ratio: 0.5 },   
    { color: "rgba(0, 0, 255, 1)", ratio: 1 }  
  ],
  maxDensity: 0.01,
  minDensity: 0
};
 
// New CSV Layer
  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
    latitudeField:"Lat",
        longitudeField:"Lon",
    popupTemplate: template,
    renderer: renderer,
    labelsVisible: true,
    labelingInfo: [
      {
        // Text Symbols
        symbol: {
          type: "text",
          color: "white",
          font: {
            family: "Noto Sans",
            size: 8
          },
          haloColor: "#472b77",
          haloSize: 0.75
        },
        labelPlacement: "center-center",
        labelExpressionInfo: {
         
        },
      }
    ]
  });
 
  const map = new Map({
    basemap: "topo",// basemaps to streets
    layers: [layer]
  });
 
  const view = new MapView({
    container: "viewDiv",
    center: [-90.1994, 38.6270], //STL
    zoom: 15,
    map: map
  });
 
  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"
  );
});