import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootObject, Article } from '../classes/Coins';

 @Injectable({
     providedIn: 'root'
 })
 export class coinService 
 {
     cryptoUrl = 'https://bitcoggapi.azurewebsites.net/api/coin';
        
     constructor(private _http: HttpClient) { }

     getCryptos(): Observable<any> {
         console.log(this._http.get<RootObject[]>(this.cryptoUrl))
         return this._http.get(this.cryptoUrl)
     }
     getCryptoNews(): Observable<any> {
        console.log(this._http.get<Article[]>(this.cryptoUrl + '/News'))
         return this._http.get(this.cryptoUrl + '/News')
     }
 }

