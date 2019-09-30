import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class SocketProvider extends Socket {

  constructor(
    urlService: UrlService,
  ) {
    super({
      url: `${urlService.url}/conversation`,
      options: {
        query: {
          token: localStorage.getItem('chatToken'),
        },
      },
    });
  }
}
