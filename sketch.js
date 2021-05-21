const myIcon = L.icon({
            iconUrl: 'issImage.svg',
            iconSize: [38 + 7, 7 + 95],
            iconAnchor: [(38 + 7) / 2, (7 + 95) / 2]
        });
        // my latLon 23.26558,77.43462
        let firstTime = true;
        let mymap = L.map('mymap').setView([23.26558, 77.43462], 2);

        const attribution = "" //'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        const tiles = L.tileLayer(tileURL, {
            attribution
        });
        tiles.addTo(mymap);

        let marker = L.marker([0, 0], {
            icon: myIcon
        }).addTo(mymap);




        async function getData() {
            const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
            const data = await response.json();
            const {
                latitude,
                longitude
            } = data;

            document.getElementById("lat").innerText = latitude.toFixed(2);
            document.getElementById("lon").innerText = longitude.toFixed(2);

            marker.setLatLng([latitude, longitude], {
                icon: myIcon
            });
            if (firstTime) {
                mymap.setView([latitude, longitude]);
                firstTime = false;
            }
            //console.log(data)
        }

        getData()
        setInterval(getData, 1000)
