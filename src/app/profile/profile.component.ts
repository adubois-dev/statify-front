import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  spotifyUserInfos: any
  private baseUrl = 'http://localhost:8080/api/spUser/user/';


  constructor(private storageService: StorageService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getSpotifyUserInfos();
  }

  getSpotifyUserInfos(): any {
    this.httpClient.get(`${this.baseUrl}${this.currentUser.uuid}`, {responseType: 'json'}).subscribe((response) => {
      this.spotifyUserInfos = response;
    });
  }
}
