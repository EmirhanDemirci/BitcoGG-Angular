import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  //Checkt in de JWT of het een gebruiker of admin is.
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.IsAdmin())
    {
      this.router.navigate(['home'])
      return false;
    }
    return true;
  }
}
