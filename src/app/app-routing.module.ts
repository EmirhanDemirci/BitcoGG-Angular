import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { IsAdminGuard } from './auth/is-admin.guard';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CryptoNewsComponent } from './crypto-news/crypto-news.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  { path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  { path: 'wallet', component:WalletComponent,canActivate:[AuthGuard]},
  { path: 'crypto-news', component:CryptoNewsComponent,canActivate:[AuthGuard]},
  { path: 'admin', component:AdminComponent,canActivate:[IsAdminGuard]},
  { path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
