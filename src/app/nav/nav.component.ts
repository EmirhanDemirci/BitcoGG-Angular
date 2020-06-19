import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../shared/user.service';
import { Wallet } from '../models/Wallet';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  wallet: Wallet = new Wallet();
  isAdmin;
  hasWallet;
  constructor(private router: Router, private authService: AuthService, private accountService: UserService) { }
  //Saves the admin / wallet in a variable to use it on the view
  ngOnInit(): void {
    this.isAdmin = this.authService.IsAdmin();
    this.hasWallet = this.authService.GetWallet();
  }
  // Makes sure when the user logs out it deletes all the localstorages
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/user/login'])
  }
}
