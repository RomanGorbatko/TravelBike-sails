/**
 * Created by roman on 9/29/15.
 */

"use strict";
class Map {
    constructor (el) {
        var _this = this;
        _this.config = {};

        _this.config.globalMapId = el || 'map';
        _this.map = new google.maps.Map(document.getElementById(_this.config.globalMapId), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }
}