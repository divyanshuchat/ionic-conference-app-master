import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import {
GoogleMap,
GoogleMapsEvent,
GoogleMapsLatLng,
CameraPosition,
GoogleMapsMarkerOptions,
GoogleMapsMarker
} from 'ionic-native';

declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(public confData: ConferenceData, public platform: Platform) {
    }

    ngAfterViewInit() {
        this.loadMap();
    }

    ionViewDidLoad() {

        /*this.confData.getMap().subscribe(mapData => {
            let mapEle = this.mapElement.nativeElement;

            let map = new google.maps.Map(mapEle, {
                center: mapData.find(d => d.center),
                zoom: 16
            });

            mapData.forEach(markerData => {
            let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
            });

            let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
            });

            marker.addListener('click', () => {
            infoWindow.open(map, marker);
            });
            });

            google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
            });

        });
*/

    }

loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic'
    };

    map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
    });
}
}
