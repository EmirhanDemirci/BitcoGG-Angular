import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RootObject } from "../models/RootObject";
import { Coin } from "../models/Coin";
import { coinService } from '../shared/coin.service';
import * as CanvasJS from '../JS/canvasjs.min';
import 'jquery';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from '../models/Wallet';
import { PurchasedCoin } from '../models/PurhcasedCoin';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ChartComponent } from '../chart/chart.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  Coin: Coin = new Coin();
  PurchasedCoin: PurchasedCoin = new PurchasedCoin();
  Data$: Coin[] = [];

  coinModel = this.fb.group({
    Name: [''],
    Quantity: [0, Validators.required],
    Price: [''],
  });

  walletModel = this.fb.group({
    Name: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private router: Router, public service: UserService, private coinService: coinService, private httpclient: HttpClient, private authService: AuthService, private toastr: ToastrService) { }
  // Before the page loads it makes sure to get all the cryptos and reset the formModel
  ngOnInit() {
    this.service.formModel.reset();
    this.coinService.getCryptos()
      .subscribe(
        (res: RootObject) => {
          this.Data$ = res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  // A function to create a wallet
  onSubmit() {
    console.log(this.walletModel.value);
    this.service.createWallet(this.walletModel).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.service.formModel.reset();
          this.toastr.success('New wallet created', 'Successful Wallet');
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Already exists');
      }
    );
  }
  // A function to purchase coins
  purchaseCoin() {
    console.log(this.coinModel.value);
    this.service.PurchaseCoin(this.coinModel).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.service.formModel.reset();
          this.toastr.success('Succesfully purchased', 'Successful');
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Purhcase failed');
      }
    );
  }
  // A function to get the specific coin
  getCoin(coin: Coin) {
    this.Coin = coin;
    console.log(this.Coin);

    this.coinModel = this.fb.group({
      Name: [this.Coin.name],
      Quantity: [0, Validators.required],
      Price: [(Math.round(this.Coin.quote.usd.price * 100) / 100).toFixed(2)]
    });
  }
}

