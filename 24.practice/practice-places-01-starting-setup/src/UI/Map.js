
export class Map {
  constructor(coords) {
      // this.coordinates = coords;
      this.render(coords);
    }
    
    render(coordinates) {
      document.getElementById("map").innerHTML = ""; // clear the <p> in the <div id="map">
    if (!ol) {
      alert("Cloud not load maps - please try again later.");
      return;
    }

    const map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        zoom: 16,
      }),
    });
  }
}
