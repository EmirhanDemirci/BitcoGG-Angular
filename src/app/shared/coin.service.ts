import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from "../models/Article";
import { RootObject } from "../models/RootObject";

 @Injectable({
     providedIn: 'root'
 })
 export class coinService 
 {
     cryptoUrl = 'https://bitcoggapi.azurewebsites.net/api/coin';
     localURI = 'https://localhost:44378/api/coin';
        
     constructor(private _http: HttpClient) { }
    //Get the cryptos from api
     getCryptos(): Observable<any> {
         console.log(this._http.get<RootObject[]>(this.localURI))
         return this._http.get(this.localURI)
     }
     //Get the crypto news from api
     getCryptoNews(): Observable<any> {
        console.log(this._http.get<Article[]>(this.localURI + '/News'))
         return this._http.get(this.localURI + '/News')
     }
 }

