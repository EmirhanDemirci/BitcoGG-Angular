import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RootObject, Datum } from '../classes/Coins';
import { coinService } from '../shared/coin.service';
// import { coinService } from '../shared/coin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
userDetails;
Data$: Datum[] = [];
  constructor(private router: Router,private service:UserService, private coinService: coinService, private httpclient: HttpClient) { }


  ngOnInit() {


    this.coinService.getCryptos()
    .subscribe(
      (res: RootObject) =>{
        this.Data$ = res.data;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.service.getUserProfile().subscribe(
      res =>{ 
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      },
    );
  }
  onLogout(){
    // Delete the token (Logout)
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }

}
