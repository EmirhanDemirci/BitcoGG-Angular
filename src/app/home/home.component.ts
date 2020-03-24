import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Coins } from '../classes/coins';
import { coinService } from '../shared/coin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
userDetails;
  constructor(private router: Router,private service:UserService, private httpclient: HttpClient, private _coinService: coinService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res =>{ 
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      },
    );
    this._coinService.getCoins().subscribe(
      data=>
      {
        this.coins = data;
      }
    )
  }

coins:Coins[];

 



  onLogout(){
    // Delete the token (Logout)
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }

}
