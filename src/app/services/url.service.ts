import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  environement: string;
  url: string;

  constructor() {
    this.environement = 'dev';
    // this.environement = 'prod';
    switch (this.environement) {
      case 'dev':
        // this.url = 'http://localhost:3000';
        this.url = 'http://192.168.1.27:3000';
        break;
      default:
        break;
    }
  }
}
