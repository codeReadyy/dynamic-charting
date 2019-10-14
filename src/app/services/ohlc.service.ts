import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class OhlcService {
  private url: string = "http://kaboom.rksv.net/api/";
  constructor( private $http: Http
  ) { }

  public get_historical_data(){
    return this.make_api_call('historical');
  }

  private make_api_call(api: string): Observable<any>{
    let caller = this.url + api;
    return this.$http.get(caller).pipe
         (map(this._read_response))
         //.catch(this._handle_error);
  };

  private _read_response(res:Response): object {
		let response = res.json();
		if('Result' in response){
			return response.Result;
		}
		return response;
  }
  
  // private _handle_error(error:any) {
	// 	if(error.status == 401 || error.status == 302 || error.status == 10 || error.status == 403 ){
	// 		window.localStorage.clear();
	// 		window.sessionStorage.clear();
	// 		console.log("Unauthorized");
	// 	};
	// 	let message:string = (error.message) ? error.message :  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	//   return Observable.throw(message);
	// }

}
