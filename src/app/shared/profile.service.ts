import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {

  constructor(http: HttpClient) {
    super('/profile', http);
  }
  //Post image to api (Not working)
  postFile(fileToUpload: File) {
    const endpoint = 'https://bitcoggapi.azurewebsites.net/api/file';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}