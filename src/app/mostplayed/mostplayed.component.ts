import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mostplayed',
  templateUrl: './mostplayed.component.html',
  styleUrls: ['./mostplayed.component.css']
})
export class MostplayedComponent implements OnInit{

  currentUser: any;
  top50: any
  private baseUrl = 'http://localhost:8080/api/historic/user/mostplayed';


  constructor(private storageService: StorageService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getTop50();

  }
  getTop50() : any{
    this.httpClient.get(`${this.baseUrl}/${this.currentUser.uuid}`, { responseType: 'json' }).subscribe((response)=>{
      this.top50=response;
    });
  }


  millisecondsToMinutes(milliseconds: number) {
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    const seconds = Math.floor((milliseconds % oneMinute) / oneSecond);
    const minutes = Math.floor((milliseconds % oneHour) / oneMinute);
    const hours = Math.floor((milliseconds % oneDay) / oneHour);
    const days = Math.floor(milliseconds / oneDay);

    let timeString = '';
    if (days !== 0) {
      timeString += (days !== 1) ? (days + ' jours ') : (days + ' jour ');
    }
    if (hours !== 0) {
      timeString += (hours !== 1) ? (hours + ' heures ') : (hours + ' heure ');
    }
    if (minutes !== 0) {
      timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    }
    if (seconds !== 0 || milliseconds < 1000) {
      timeString += (seconds !== 1) ? (seconds + ' secondes ') : (seconds + ' seconde ');
    }

    return timeString;
  };

}
