import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PurchasedCoin } from '../models/PurhcasedCoin';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  // Gets the purchased coins from the user
  ngOnInit(): void {
    this.userService.GetPurchasedCoin()
      .subscribe(
        (res: any) => {
          this.purchasedCoins = res;
          this.toastr.info('If you dont see any coin u forgot to purchase', 'Info');
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message, 'Purhcase failed');
        }
      );
  }
  // Updates the purchased coins from the user (Nopt working)
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
