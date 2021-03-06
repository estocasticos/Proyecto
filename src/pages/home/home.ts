import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, PopoverController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { AlertController } from 'ionic-angular';
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
  impDistancia: number;
  impFila: number;
  impSabor: number;
  distanciaHemeroteca: number;
  distanciaCentral: number;
  distanciaFlecha: number;
  distanciaFem: number;
  distanciaAgro: number;
  distanciaEco: number;
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController,
    private geolocation: Geolocation, public rest: GoogleService, public navParams : NavParams, public alertCtrl: AlertController) {
      this.impDistancia= navParams.data.impDistancia;
      this.impFila= navParams.data.impFila;
      this.impSabor= navParams.data.impSabor;
      console.log(this.impDistancia + this.impFila + this.impSabor);
  }


  ionViewDidLoad(){
    console.log(this.impDistancia + this.impFila + this.impSabor)
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
  //console.log(latitude, longitude);

  // create a new map by passing HTMLElement
  let mapEle: HTMLElement = document.getElementById('map');

  // create LatLng object
  let myLatLng = {lat: latitude, lng: longitude};

  // create map
  this.map = new google.maps.Map(mapEle, {
    center: myLatLng,
    zoom: 14
  });

  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //console.log(myLatLng);
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Yo',
      icon: 'assets/img/male.png'
    });
  });
  this.rest.GetDistances(latitude,longitude)
    .subscribe(
      res => {this.markers(res,mapEle,myLatLng);
              //console.log(distances)
            },
      error => console.log("error prro")
    )
  }

  markers(distances: any, mapEle: any, myLatLng: any){
      let dist=JSON.parse(distances)
      this.distanciaCentral =dist.central
      this.distanciaFem =dist.FEM
      this.distanciaEco =dist.Economia
      this.distanciaFlecha =dist.LaFlecha
      this.distanciaAgro =dist.Agronomia
      this.distanciaHemeroteca =dist.Hemeroteca
    console.log(dist)
      var contentStringCentral = '<div id="content" style="align-content: center">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Comedor Central</h1>'+
          '<div id="bodyContent"  style="align-content: center">'+
          '<img src="assets/img/comcent.jpg" alt="comedor central" height="170" width="144">'+
          '<p>comedor info</p>'+
          '<p> Distancia: '+ dist.central +' metros </p>'+
          '</div>'+
          '</div>';

      var infowindowCentral = new google.maps.InfoWindow({
        content: contentStringCentral
      });


      var contentStringFEM = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Comedor FEM</h1>'+
        '<div id="bodyContent">'+
        '<img src="assets/img/Fem.jpg" alt="comedor Fem" height="170" width="144">'+
        '<p>comedor info</p>'+
        '<p> Distancia: '+ dist.FEM +' metros </p>'+
        '</div>'+
        '</div>';

      var infowindowFEM = new google.maps.InfoWindow({
        content: contentStringFEM
      });

      var contentStringEconomia = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Comedor Economia</h1>'+
        '<div id="bodyContent">'+
        '<img src="assets/img/Economia.jpg" alt="comedor Economia" height="170" width="144">'+
        '<p>comedor info</p>'+
        '<p> Distancia: '+ dist.Economia +'metros </p>'+
        '</div>'+
        '</div>';

      var infowindowEconomia = new google.maps.InfoWindow({
        content: contentStringEconomia
      });

      var contentStringFlecha = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Comedor Flecha</h1>'+
        '<div id="bodyContent">'+
        '<img src="assets/img/Flecha.jpg" alt="comedor flecha" height="170" width="144">'+
        '<p>comedor info</p>'+
        '<p> Distancia: '+ dist.LaFlecha +'metros </p>'+
        '</div>'+
        '</div>';

      var infowindowFlecha = new google.maps.InfoWindow({
        content: contentStringFlecha
      });

      var contentStringAgronomia = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Comedor Agronomia</h1>'+
        '<div id="bodyContent">'+
        '<img src="assets/img/Agronomia.jpg" alt="comedor Agronomia" height="170" width="144">'+
        '<p>comedor info</p>'+
        '<p> Distancia: '+ dist.Agronomia +'metros </p>'+
        '</div>'+
        '</div>';

      var infowindowAgronomia = new google.maps.InfoWindow({
        content: contentStringAgronomia
      });

      var contentStringHemeroteca = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Comedor Hemeroteca</h1>'+
        '<div id="bodyContent">'+
        '<img src="assets/img/Hemeroteca.jpg" alt="comedor Hemeroteca" height="170" width="144">'+
        '<p>comedor info</p>'+
        '<p> Distancia: '+ dist.Hemeroteca +' </p>'+
        '</div>'+
        '</div>';

      var infowindowHemeroteca = new google.maps.InfoWindow({
        content: contentStringHemeroteca
      });


        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          //console.log(myLatLng);
          let marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: 'Yo',
            icon: 'assets/img/male.png'
          });

        let markerCentral = new google.maps.Marker({
          position: {lat: 4.634603, lng:-74.082858},
          map: this.map,
          title: 'Comedor Central',
          icon: 'assets/img/cafetaria.png'
        });
        markerCentral.addListener('click', function() {
          infowindowCentral.open(this.map, markerCentral);
        });

        let markerFEM = new google.maps.Marker({
          position: {lat: 4.637810, lng:-74.082686},
          map: this.map,
          title: 'Cafeteria del FEM',
          icon: 'assets/img/cafetaria.png'
        });
        markerFEM.addListener('click', function() {
          infowindowFEM.open(this.map, markerFEM);
        });

        let markerEconomia = new google.maps.Marker({
          position: {lat: 4.636989, lng:-74.080826},
          map: this.map,
          title: 'Cafeteria C. Economicas',
          icon: 'assets/img/cafetaria.png'
        });
        markerEconomia.addListener('click', function() {
          infowindowEconomia.open(this.map, markerEconomia);
        });

        let markerLaFlecha = new google.maps.Marker({
          position: {lat: 4.633774, lng:-74.084300},
          map: this.map,
          title: 'Cafeteria La Flecha',
          icon: 'assets/img/cafetaria.png'
        });
        markerLaFlecha.addListener('click', function() {
          infowindowFlecha.open(this.map, markerLaFlecha);
        });

        let markerAgronomia = new google.maps.Marker({
          position: {lat: 4.635813, lng:-74.087402},
          map: this.map,
          title: 'Cafeteria de Agronomia',
          icon: 'assets/img/cafetaria.png'
        });
        markerAgronomia.addListener('click', function() {
          infowindowAgronomia.open(this.map, markerAgronomia);
        });

        let markerHemeroteca = new google.maps.Marker({
          position: {lat: 4.636721, lng:-74.091003},
          map: this.map,
          title: 'Cafeteria de la Hemeroteca',
          icon: 'assets/img/cafetaria.png'
        });
        markerHemeroteca.addListener('click', function() {
          infowindowHemeroteca.open(this.map, markerHemeroteca);
        });

        mapEle.classList.add('show-map');
      });
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
  ayudar(){

    var media_hemeroteca = 130;
    var media_central = 190;
    var media_flecha = 80;
    var media_economia = 70;
    var media_fem = 65;
    var media_agronomia = 55;

    var sabor_hemeroteca = 95;
    var sabor_central = 69;
    var sabor_flecha = 86;
    var sabor_economia = 76;
    var sabor_fem = 91;
    var sabor_agronomia = 72;
    //var miu = 1/tiempo_en_fila;
    var miu_horas = 98;
    var lq_hemeroteca = Math.abs(media_hemeroteca*media_hemeroteca/(miu_horas*(miu_horas-media_hemeroteca)));
    var lq_central = Math.abs(media_central*media_central/(miu_horas*(miu_horas-media_central)));
    var lq_flecha = Math.abs(media_flecha*media_flecha/(miu_horas*(miu_horas-media_flecha)));
    var lq_economia = Math.abs(media_economia*media_economia/(miu_horas*(miu_horas-media_economia)));
    var lq_fem = Math.abs(media_fem*media_fem/(miu_horas*(miu_horas-media_fem)));
    var lq_agronomia = Math.abs(media_agronomia*media_agronomia/(miu_horas*(miu_horas-media_agronomia)));

    var ws_hemeroteca = (media_hemeroteca/(miu_horas*(miu_horas-media_hemeroteca)))+miu_horas;
    var ws_central = (media_central/(miu_horas*(miu_horas-media_central)))+miu_horas;
    var ws_flecha = (media_flecha/(miu_horas*(miu_horas-media_flecha)))+miu_horas;
    var ws_economia = (media_economia/(miu_horas*(miu_horas-media_economia)))+miu_horas;
    var ws_fem = (media_fem/(miu_horas*(miu_horas-media_fem)))+miu_horas;
    var ws_agronomia = (media_agronomia/(miu_horas*(miu_horas-media_agronomia)))+miu_horas;

    var utilidad_hemeroteca = ( (-this.distanciaHemeroteca/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_hemeroteca)  + (this.impSabor * sabor_hemeroteca)
    var utilidad_central = ((-this.distanciaCentral/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_central)  + (this.impSabor * sabor_central)
    var utilidad_flecha = ((-this.distanciaFlecha/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_flecha)  + (this.impSabor * sabor_flecha)
    var utilidad_fem = ((-this.distanciaFem/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_economia)  + (this.impSabor * sabor_economia)
    var utilidad_agro = ((-this.distanciaAgro/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_fem)  + (this.impSabor * sabor_fem)
    var utilidad_eco = ((-this.distanciaEco/(10*this.impDistancia))) + ((- 1*this.impFila) * lq_agronomia)  + (this.impSabor * sabor_agronomia)
    var maximo = Math.max(utilidad_hemeroteca, utilidad_central, utilidad_flecha, utilidad_fem, utilidad_agro, utilidad_eco);
    var salida = "";
    if (maximo == utilidad_hemeroteca){
      salida = "el comedor de la Hemeroteca"
    }
    if (maximo == utilidad_central){
      salida = "el comedor Central"
    }
    if (maximo == utilidad_flecha){
      salida = "la cafeteria de la Flecha"
    }
    if (maximo == utilidad_fem){
      salida = "la cafeteria del FEM"
    }
    if (maximo == utilidad_agro){
      salida = "La cafeteria de Agronomia"
    }
    if (maximo == utilidad_eco){
      salida = "la cafeteria de C. Economicas"
    }
    console.log(((-this.distanciaCentral/(10*this.impDistancia))));
    console.log(( lq_flecha));
    console.log((this.impSabor * sabor_central));
    console.log(utilidad_hemeroteca);
    console.log(utilidad_central);
    console.log(utilidad_flecha);
    console.log(utilidad_fem);
    console.log(utilidad_agro);
    console.log(utilidad_eco);
    let alert = this.alertCtrl.create({
      title: 'Sugerencia',
      subTitle: 'la mejor opción porque representa una mayor utilidad es ir a ' + salida,
      buttons: ['OK']
    });
    alert.present();
  }

}

//
