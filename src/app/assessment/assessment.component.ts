import {Component, OnInit} from '@angular/core';
import {StorageService} from "../_services/storage.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit{

  currentUser: any;
  assessment: any
  private baseUrl = 'http://localhost:8080/api/historic/user/assessment';


  constructor(private storageService: StorageService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getAssessment();

  }
  getAssessment() : any{
    this.httpClient.get(`${this.baseUrl}/${this.currentUser.uuid}`, { responseType: 'json' }).subscribe((response)=>{
    this.assessment=response;
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
      timeString += (days !== 1) ? (days + ' jours ') : (days + ' day ');
    }
    if (hours !== 0) {
      timeString += (hours !== 1) ? (hours + ' heures ') : (hours + ' hour ');
    }
    if (minutes !== 0) {
      timeString += (minutes !== 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
    }
    if (seconds !== 0 || milliseconds < 1000) {
      timeString += (seconds !== 1) ? (seconds + ' secondes ') : (seconds + ' second ');
    }

    return timeString;
  };
}
