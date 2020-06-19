import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  userDetails;
  imageUrl: string = "/assets/img/ProfilePage.png";
  fileToUpload: File = null;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, http: HttpClient,) { }

  ngOnInit(): void {

    this.userDetails = this.authService.GetUser();
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  //Submitting the image to the api (Not working)
  OnSubmit(Image) {
    this.userService.postFile(this.fileToUpload).subscribe(
      data => {
        console.log('done');
        Image.value = null;
        this.imageUrl = "/assets/img/ProfilePage.png";
      }
    );
  }
}
