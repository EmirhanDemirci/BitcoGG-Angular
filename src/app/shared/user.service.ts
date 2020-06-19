import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { PurchasedCoin } from '../models/PurhcasedCoin';
import { Wallet } from '../models/Wallet';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) { }
  readonly BaseURI = 'https://bitcoggapi.azurewebsites.net/api';
  readonly LocalURI = 'https://localhost:44378/api';

  // Form model this is used to log the user in
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });
  // A function to compare passwords (front-end)
  comparePasswords(fb: FormGroup) {
    const confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value !== confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  // A funtion to register the user based on the values in the form
  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FirstName: this.formModel.value.FirstName,
      Lastname: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/User/Register', body, { observe: 'response' });
  }

  // A function to login the user
  login(formData) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  // A function to get all the users before the admin can delete it
  getAllUsers() {
    var userId = this.authService.GetUser().id;
    return this.http.get(`${this.BaseURI}/User/${userId}/all`)
  }

  // A function that can remove all users based on if the user is admin or not
  deleteUser(selectedId: number) {
    console.log(selectedId);
    var id = this.authService.GetUser().id;
    return this.http.post(`${this.BaseURI}/User/${id}/delete`, selectedId);
  }

  // Posting a profile image (Not working)
  postFile(fileToUpload: File) {
    var userId = this.authService.GetUser().id;
    const formData: FormData = new FormData();
    formData.append('fileToUpload', fileToUpload, fileToUpload.name)
    return this.http.post(`${this.BaseURI}/File/upload/${userId}`, formData)
  }
  // Create a wallet
  createWallet(walletModel: FormGroup) {
    var userId = this.authService.GetUser().id;
    console.log(walletModel);
    return this.http.post(`${this.BaseURI}/User/${userId}/CreateWallet`, walletModel.value, { observe: 'response' });
  }
  // Delete the wallet (Not working)
  DeleteWallet(wallet: Wallet) {
    var userId = this.authService.GetUser().id;
    return this.http.post(`${this.BaseURI}/User/${userId}/DeleteWallet`, wallet);
  }
  // Purhcase a coin
  PurchaseCoin(coinModel: FormGroup) {
    var userId = this.authService.GetUser().id;
    var walletId = this.authService.GetWallet();
    console.log(walletId);
    return this.http.post(`${this.BaseURI}/User/${userId}/PurchaseCoin`, coinModel.value, { observe: 'response' });
  }
  // Get all the purchased coins
  GetPurchasedCoin() {
    var userId = this.authService.GetUser().id;
    return this.http.get(`${this.BaseURI}/User/${userId}/GetUserWallet`)
  }
  // Update all the purchased coins (Not working)
  UpdatePurchasedCoin(formData) {
    var userId = this.authService.GetUser().id;
    return this.http.post(`${this.BaseURI}/User/${userId}/UpdatePurchasedCoin`, formData, { observe: 'response' });
  }
}