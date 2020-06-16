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
  constructor(private router: Router, private authService: AuthService, private accountService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.IsAdmin();
  }

  onLogout(){
    // Delete the token (Logout)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/user/login'])
  }
}
