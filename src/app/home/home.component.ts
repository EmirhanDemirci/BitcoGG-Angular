import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RootObject, Coin } from '../classes/Coins';
import { coinService } from '../shared/coin.service';
import * as CanvasJS from '../JS/canvasjs.min';
import * as $ from "jquery";
import { AuthService } from '../auth/auth.service';
// import { coinService } from '../shared/coin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  Coin: Coin = new Coin();
  Data$: Coin[] = [];
  isAdmin;
  constructor(private router: Router,private service:UserService, private coinService: coinService, private httpclient: HttpClient, private authService: AuthService) { }

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
    this.isAdmin = this.authService.IsAdmin();
  }
  
  onLogout(){
    // Delete the token (Logout)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/user/login'])
  }

  getCoin(coin: Coin){
    this.Coin = coin;
    console.log(this.Coin);
  }
  getChart(){
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      axisY: {
        includeZero: false
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: [{
            y: 450
          },
          {
            y: 414
          },
          {
            y: 520,
            indexLabel: "\u2191 highest",
            markerColor: "red",
            markerType: "triangle"
          },
          {
            y: 460
          },
          {
            y: 450
          },
          {
            y: 500
          },
          {
            y: 480
          },
          {
            y: 480
          },
          {
            y: 410,
            indexLabel: "\u2193 lowest",
            markerColor: "DarkSlateGrey",
            markerType: "cross"
          },
          {
            y: 500
          },
          {
            y: 480
          },
          {
            y: 510
          }
        ]
      }]
    });
    chart.render();
  }   
}
