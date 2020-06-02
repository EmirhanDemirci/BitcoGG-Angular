import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { RootObject, Article } from '../classes/Coins';
import { Observable } from 'rxjs';

 @Injectable({
     providedIn: 'root'
 })
 export class coinService 
 {
     cryptoUrl = 'https://localhost:44378/api/coin';
        
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

