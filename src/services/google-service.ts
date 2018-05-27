import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class GoogleService{
  constructor(public http: Http) {
  }
    GetDistances(latitude: number, longitude: number): Observable<any>{
        let headers = new Headers({ 'Access-Control-Allow-Headers': 'Authorization'});
        let options = new RequestOptions({ headers: headers });
        let destination = "4.634603,-74.082858|4.637810,-74.082686|4.636989,-74.080826|4.633774,-74.084300|4.635813,-74.087402|4.636721,-74.091003";
        let Url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=walking&origins=" + latitude+"," +longitude+ "&destinations="+destination+"&key=AIzaSyCn7UxDVsdSkYucnQhKJULWInNVJv2qEGM"
        //console.log(Url)
        return this.http.get(Url, options)
                    .map(this.extractData)
                    .catch(this.handleError);

    }

private extractData(res: Response) {
  let body = res.json();
  let distances = body["rows"]["0"]["elements"];
  //console.log(distances);
  let distance = JSON.stringify(
    {
      central: distances["0"]["distance"]["value"],
      FEM: distances["1"]["distance"]["value"],
      Economia: distances["2"]["distance"]["value"],
      LaFlecha: distances["3"]["distance"]["value"],
      Agronomia: distances["4"]["distance"]["value"],
      Hemeroteca: distances["5"]["distance"]["value"],
    });
    //console.log(distance);
  return distance || { };
}
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
