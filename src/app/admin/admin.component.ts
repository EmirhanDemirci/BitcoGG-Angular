import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users:any[] = [];
  constructor(private router: Router,private service:UserService) { }

  ngOnInit() {
    this.service.getAllUsers().subscribe(
      (res:any) => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

   deleteUser(userId: number){
    this.service.deleteUser(userId).subscribe(
      (res:any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
