import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { GoogleService } from '../../services/google-service'

declare var google;


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController,
    private geolocation: Geolocation, public rest: GoogleService) {
  }


  ionViewDidLoad(){
      this.getPosition();
    }

  getPosition():any{
  this.geolocation.getCurrentPosition().then(response => {
    this.loadMap(response);
  })
  .catch(error =>{
    console.log(error);
  })
}


loadMap(position: Geoposition){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);

  // create a new map by passing HTMLElement
  let mapEle: HTMLElement = document.getElementById('map');

  // create LatLng object
  let myLatLng = {lat: latitude, lng: longitude};

  // create map
  this.map = new google.maps.Map(mapEle, {
    center: myLatLng,
    zoom: 16
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Comedor Central</h1>'+
      '<div id="bodyContent">'+
      '<img src="../../assets/img/comcent.jpg" alt="comedor central" height="170" width="144">'+
      '<p>comedor info</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    console.log(myLatLng);
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Yo',
      icon: '../../assets/img/persona.png'
    });

    let markerCentral = new google.maps.Marker({
      position: {lat: 4.634603, lng:-74.082858},
      map: this.map,
      title: 'Comedor Central',
      icon: '../../assets/img/restaurante.png'
    });
    markerCentral.addListener('click', function() {
      infowindow.open(this.map, markerCentral);
    });

    let markerFEM = new google.maps.Marker({
      position: {lat: 4.637810, lng:-74.082686},
      map: this.map,
      title: 'Cafeteria del FEM',
      icon: '../../assets/img/restaurante.png'
    });
    let markerEconomia = new google.maps.Marker({
      position: {lat: 4.636989, lng:-74.080826},
      map: this.map,
      title: 'Cafeteria C. Economicas',
      icon: '../../assets/img/restaurante.png'
    });
    let markerLaFlecha = new google.maps.Marker({
      position: {lat: 4.633774, lng:-74.084300},
      map: this.map,
      title: 'Cafeteria La Flecha',
      icon: '../../assets/img/restaurante.png'
    });
    let markerAgronomia = new google.maps.Marker({
      position: {lat: 4.635813, lng:-74.087402},
      map: this.map,
      title: 'Cafeteria de Agronomia',
      icon: '../../assets/img/restaurante.png'
    });
    let markerHemeroteca = new google.maps.Marker({
      position: {lat: 4.636721, lng:-74.091003},
      map: this.map,
      title: 'Cafeteria de la Hemeroteca',
      icon: '../../assets/img/restaurante.png'
    });


    mapEle.classList.add('show-map');
  });

  this.rest.GetDistances(latitude,longitude)
    .subscribe(
      res => {let distances = res;
              console.log(distances)},
      error => console.log("error prro")
    )
  }


  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
