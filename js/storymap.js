    (function ($) {
    'use strict';


    $.fn.storymap = function(options) {

        var defaults = {
            selector: '[data-place]',
            breakpointPos: '33.333%',
            createMap: function () {
                // create a map in the "map" div, set the view to a given place and zoom
                var map = L.map('map').setView([39.74, -89.77], 5);

                // add an OpenStreetMap tile layer
               L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
               }).addTo(map);

               $.getJSON('data/american_surfaces_2.geojson', function(data){
                    var data = data;

                    var locationMarkers = function(feature, latlng){
                          var geojsonMarkerOptions = L.marker(latlng,  {
                              radius: 8,
                              stroke: false,
                              fillColor: "#ff7800",
                              color: "#000",
                              opacity: 1,
                              fillOpacity: 0.6
                            });

                          return geojsonMarkerOptions;
                    }

                    var locationClick = function (feature, layer) {
                        // let's bind some feature properties to a pop up
                        layer.bindPopup("<h2>" + feature.properties.city + ", " + feature.properties.state + "</h2>");
                    }

                    L.geoJson(data, {
                        pointToLayer: locationMarkers,
                        onEachFeature: locationClick
                  }).addTo(map);
           });
                return map;
            }
        };

        var settings = $.extend(defaults, options);


        if (typeof(L) === 'undefined') {
            throw new Error('Storymap requires Laeaflet');
        }
        if (typeof(_) === 'undefined') {
            throw new Error('Storymap requires underscore.js');
        }

        function getDistanceToTop(elem, top) {
            var docViewTop = $(window).scrollTop();

            var elemTop = $(elem).offset().top;

            var dist = elemTop - docViewTop;

            var d1 = top - dist;

            if (d1 < 0) {
                return $(window).height();
            }
            return d1;

        }

        function highlightTopPara(paragraphs, top) {

            var distances = _.map(paragraphs, function (element) {
                var dist = getDistanceToTop(element, top);
                return {el: $(element), distance: dist};
            });

            var closest = _.min(distances, function (dist) {
                return dist.distance;
            });

            _.each(paragraphs, function (element) {
                var paragraph = $(element);
                if (paragraph[0] !== closest.el[0]) {
                    paragraph.trigger('notviewing');
                }
            });

            if (!closest.el.hasClass('viewing')) {
                closest.el.trigger('viewing');
            }
        }

        function watchHighlight(element, searchfor, top) {
            var paragraphs = element.find(searchfor);
            highlightTopPara(paragraphs, top);
            $(window).scroll(function () {
                highlightTopPara(paragraphs, top);
            });
        }

        var makeStoryMap = function (element, markers) {

            var topElem = $('<div class="breakpoint-current"></div>')
                .css('top', settings.breakpointPos);
            $('body').append(topElem);

            var top = topElem.offset().top - $(window).scrollTop();

            var searchfor = settings.selector;

            var paragraphs = element.find(searchfor);

            paragraphs.on('viewing', function () {
                $(this).addClass('viewing');
            });

            paragraphs.on('notviewing', function () {
                $(this).removeClass('viewing');
            });

            watchHighlight(element, searchfor, top);

            var map = settings.createMap();

            var initPoint = map.getCenter();
            var initZoom = map.getZoom();

            var fg = L.featureGroup().addTo(map);

            function showMapView(key) {

                fg.clearLayers();
                if (key === 'overview') {
                    map.setView(initPoint, initZoom, true);
                } else if (markers[key]) {
                    var marker = markers[key];
                    var layer = marker.layer;
                    if(typeof layer !== 'undefined'){
                      fg.addLayer(layer);
                    };
                    fg.addLayer(L.marker([marker.lat, marker.lon]));
                    fg.bindPopup("<h2>" + marker.city + "</h2>");

                    map.setView([marker.lat, marker.lon], marker.zoom, 1);
                }

            }

            paragraphs.on('viewing', function () {
                showMapView($(this).data('place'));
            });
        };

        makeStoryMap(this, settings.markers);

        return this;
    }



}(jQuery));
