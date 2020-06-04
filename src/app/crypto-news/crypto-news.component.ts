import { Component, OnInit } from '@angular/core';
import { coinService } from '../shared/coin.service';
import { Article } from "../models/Article";
import { CoinsNews } from "../models/CoinsNews";
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-news',
  templateUrl: './crypto-news.component.html',
  styles: []
})
export class CryptoNewsComponent implements OnInit {
  Article: Article = new Article();
  Data: Article[] = [];
  isAdmin;
  constructor(private router: Router, private coinService: coinService, private authService: AuthService) { }


  ngOnInit() {

    this.coinService.getCryptoNews()
    .subscribe(
      (res: CoinsNews) =>{
        this.Data = res.articles;
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
}
