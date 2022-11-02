const map = new L.map("my_map", {
    center: [35.4477712, 139.6425415],
    zoom: 13
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const geoCoderControl = new GeoCoder(normalize.normalize);
geoCoderControl.addTo(map);