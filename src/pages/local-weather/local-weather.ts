import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../services/weather';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
// import { HttpErrorResponse } from '@angular/common/http';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';



@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html'
})
export class LocalWeatherPage {
  weather: any;
  impDistancia: number;
  impFila: number;
  impSabor: number;
  location: {
    state: string,
    city: string
  }

  public locationList: Array<any> = [
    {city: 'Los Angeles', state: 'CA'},
    {city: 'Miami', state: 'FL'},
    {city: 'New York', state: 'NY'},
    {city: 'Seattle', state: 'WA'}
  ]

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private geolocation: Geolocation) {
  }

  goToHome(){
    console.log(this.impDistancia);
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad(){
      this.getPosition();
    }

  getPosition():any{
  this.geolocation.getCurrentPosition().then(response => {
    //ni mrds
  })
  .catch(error =>{
    console.log(error);
  })
}

  ionViewWillEnter() {

    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);

      } else {
        this.location = {
          state: 'NY',
          city: 'New York'
        }
      }

      this.getWeather(this.location)

    });

  }

  public getWeather(location) {
    if (typeof location === 'string') {
      this.location = JSON.parse(location);
      console.log(this.location);
    } else {
      this.location = location;
    }

    this.weatherProvider.getWeather(this.location.state, this.location.city).subscribe((weather: any) => {
      this.weather = weather.current_observation;
    });
  }

}
