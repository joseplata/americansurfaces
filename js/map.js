// var map = L.map('map').setView([39.114, -87.381], 5);

// var mapTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
// }).addTo(map);

(function () {
        'use strict';

        // additional layers
        var layers = {
          'test' : L.tileLayer.wms('http://limes.grid.unep.ch/geoserver/wms?', {
              layers: 'limes:Balkash_173_20140830_LC8_NDVI',
              tiled: true,
              format: 'image/png',
              transparent: true,
              maxZoom: 14,
              minZoom: 0,
              continuousWorld: true
              })
        };

        var markers = {
            NYC : {lat: 40.7127837, lon: -74.0059413, zoom: 11 },
            greenwich : {lat: 41.0389, lon: -73.6136, zoom: 12},
            baltimore : {lat: 39.2903848, lon: -76.6121893, zoom: 12},
            fredericksburg : {lat: 38.3031837, lon: -77.4605399, zoom: 12},
            richmond : {lat: 37.5407246, lon: -77.4360481, zoom: 12},
            raleigh : {lat: 35.7795897, lon: -78.6381787, zoom: 12},
            columbia : {lat: 34.0298, lon: -80.8966, zoom: 12},
            aiken : {lat: 33.5604168, lon: -81.7195533, zoom: 12},
            macon : {lat: 32.8406946, lon: -83.6324022, zoom: 12},
            columbus : {lat: 39.9611755, lon: -82.9987942, zoom: 12},
            montgomery : {lat: 32.3667052, lon: -86.2999689, zoom: 12},
            selma : {lat: 32.4073589, lon: -87.0211007, zoom: 12}, 
            meridian : {lat: 32.3643098, lon: -88.703656, zoom: 12},
            marshall : {lat: 34.3652297, lon: -86.3376761, zoom: 12}, 
            dallas : {lat: 32.7766642, lon: -96.7969879, zoom: 12}, 
            mineralWells : {lat: 32.8084605, lon: -98.1128223, zoom: 12}, 
            lubbock : {lat: 33.577, lon: -101.8551665, zoom: 12}, 
            clovis: {lat: 34.4047987, lon: -103.2052272, zoom: 12}, 
            santaFe: {lat: 35.6869752, lon: -105.937799, zoom: 12}, 
            santaRosa: {lat: 38.440429, lon: -122.7140548, zoom: 12},
            albuquerque: {lat: 35.0853336, lon: -106.6055534, zoom: 12}, 
            chimayo: {lat: 36.0039131, lon: -105.9469656, zoom: 12}, 
            cerrillos: {lat: 33.5041325, lon: -70.7108995, zoom: 12}, 
            puebloBonito: {lat: 33.5784001, lon: -111.8188508, zoom: 12}, 
            farmington: {lat: 36.7280583, lon: -108.2186856, zoom: 12}, 
            mesaVerde: {lat:  33.6058577, lon:  -114.7310717, zoom: 12}, 
            durango: {lat: 24.0277202, lon: -104.6531759, zoom: 12}, 
            kanab: {lat: 37.0474855, lon: -112.5263145, zoom: 12}, 
            lakePowell: {lat: 37.0682619, lon: -111.2433108, zoom: 12},
            grandCanyon: {lat: 36.0544445, lon: -112.1401108, zoom: 12}, 
            winslow: {lat: 35.0241873, lon: -110.6973571, zoom: 12}, 
            holbrook: {lat: 35.7268382, lon: -110.189128, zoom: 12}, 
            gallup: {lat: 35.5280783, lon: -108.7425843, zoom: 12}, 
            tucumcari: {lat: 35.171723, lon: -103.7249662, zoom: 12}, 
            amarillo: {lat: 35.2219971, lon: -101.8312969, zoom: 12},
            alanreed: {lat: 35.2125494, lon: -100.7343059, zoom: 12},
            shamrock: {lat: 35.2142167, lon: -100.2490075, zoom: 12},
            granite: {lat: 46.3374643, lon: -113.4647823, zoom: 12}, 
            clinton: {lat: 42.5868882, lon: -82.9195514, zoom: 12}, 
            oklahomaCity: {lat: 35.4675602, lon: -97.5164276, zoom: 12}, 
            miami: {lat: 36.8836, lon: -94.87612, zoom: 12}, 
            rolla: {lat: 37.948544, lon:  -91.7715303, zoom: 12}, 
            stLouis: {lat: 38.6270025, lon: -90.1994042, zoom: 12}, 
            springfield: {lat: 42.1014831, lon: -72.589811, zoom: 12},
            normal: {lat: 40.5142026, lon: -88.9906312, zoom: 12}, 
            chicago: {lat: 41.8781136, lon: -87.6297982, zoom: 12}, 
            sandusky: {lat: 41.4489396, lon: -82.7079605, zoom: 12}, 
            toledo: {lat: 41.6639383, lon: -83.555212, zoom: 12}, 
            philadelphia: {lat: 39.9525839, lon: -75.1652215, zoom: 12}, 
            snedensLanding: {lat: 41.0110028, lon: -73.9039306, zoom: 12}, 
            rochester: {lat: 43.16103, lon: -77.6109219, zoom: 12}, 
            birmingham: {lat: 33.52, lon: -86.80, zoom: 12}, 
            washington: {lat: 38.907, lon: -77.0368, zoom: 12}, 
            statenIsland: {lat: 40.579, lon: -74.1502, zoom: 12}, 
            dayton: {lat: 39.758, lon: -84.1916, zoom: 12}, 
            petersburg: {lat: 42.7683, lon: -73.3433, zoom: 12}, 
            westport: {lat: 41.1414717, lon: -73.3579049, zoom: 12}, 
            stJohn: {lat: 47.5605413, lon: -52.7128315, zoom: 12}, 
            westPalmBeach: {lat: 26.7097, lon: -80.0642, zoom: 12}, 
            london: {lat: 51.5072, lon: 0.1277583, zoom: 12}, 
            palmBeach: {lat: 26.71534242, lon: -80.0364297, zoom: 12}, 
            jacksonville: {lat: 30.3321838, lon: -81.655651, zoom: 12}, 
            jacksonvilleNC: {lat: 34.7597, lon: -77.4097, zoom: 12}, 
            newBern: {lat: 35.108493, lon: -77.0441143, zoom: 12}, 
            capeMay: {lat: 38.9351125, lon: -80.0728201, zoom: 12}, 
            delrayBeach: {lat: 26.4614625, lon: -80.0533746, zoom: 12}, 
            capeKennedy: {lat: 28.3922182, lon: -80.6077132, zoom: 12}, 
            memphis: {lat: 35.1495343, lon: -90.0489801, zoom: 12}, 
            }
  
        $('.main').storymap({markers: markers});
    }());

