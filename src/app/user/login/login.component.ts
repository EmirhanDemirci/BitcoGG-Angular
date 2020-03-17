import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
// formModel={
//   UserName : 
// }

onSubmit(f: NgForm) {
  console.log(f.value);  // { first: '', last: '' }
}
  constructor() { }

  ngOnInit(): void {
  }

}
