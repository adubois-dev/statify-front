import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://statifyapp:8080/api/upload';

  constructor(private http: HttpClient) { }

  upload(file: File, currentUser: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);
    formData.append('email', currentUser.email);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'

    });

    return this.http.request(req);
  }

  getFiles(currentUser: any): Observable<any> {
    let queryParams = new HttpParams().append("email",currentUser.email);
    return this.http.get(`${this.baseUrl}/files`, {params:queryParams});
  }
}
