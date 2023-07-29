import {Component, Injectable, OnInit} from '@angular/core';
import {delay, Observable, of, timeout, timeoutWith} from "rxjs";
import {FileUploadService} from "../_services/file-upload.service";
import {StorageService} from "../_services/storage.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent  implements OnInit {


  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  currentUser: any;

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.fileInfos = this.uploadService.getFiles(this.currentUser);
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file, this.currentUser).pipe(
        timeout(1200000),
        catchError(e => {
          // do something on a timeout
          return of(null);
        })).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = file.name + " Uploaded & Parsed !";
            this.message.push(msg);
          }

        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          let msg = file.name + ": Failed!";

          if (err.error && err.error.message) {
            msg += " " + err.error.message;
          }
        }
      });

    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
    this.fileInfos = this.uploadService.getFiles(this.currentUser);
  }
}
