import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Admin function (Checks if the user is admin or not)
  IsAdmin(): boolean {
    var token = localStorage.getItem("token");
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    if (decodedToken.IsAdmin == 1) {
      return true;
    }
    else {
      return false;
    }
  }
  // Gets the user
  GetUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  // Gets the wallet based on the user
  GetWallet(): boolean {
    var token = localStorage.getItem("token");
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    console.log(decodedToken);
    if (decodedToken.HasWallet == decodedToken.HasWallet) {
      return true;
    }
    else {
      return false;
    }
  }
}
