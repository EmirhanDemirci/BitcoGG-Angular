import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PurchasedCoin } from '../models/PurhcasedCoin';
import { Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  coinModel = this.fb.group({
    Name: [''],
    Quantity: [0, Validators.required],
    Price: ['']
  });
  
  purchasedCoins: PurchasedCoin[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.GetPurchasedCoin()
      .subscribe(
        (res: any) => {
          this.purchasedCoins = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  UpdatePurchasedCoin(form: NgForm) {
    this.userService.UpdatePurchasedCoin(form).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
