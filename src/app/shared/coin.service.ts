import { Injectable } from "@angular/core"
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http' 

@Injectable()
export class coinService 
{
    constructor(private httpclient: HttpClient) { }

    getCoins(): Observable<any> {
        return this.httpclient.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest")
      }
}

