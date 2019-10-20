# ChatApp
A real time chat app with instant messaging using ionic 4 nodeJs expressJs mongodb and socket.io

## Getting Started
This is the front-end project, a working example is already deployed on heroku 
https://raken-hammed-chat-app.herokuapp.com/
## Prerequisites
First of all you need to have ionic 
```bash
npm install -g ionic
```
then you must install the dependencies
```bash
npm install
```
## Runnig the app
You can change the global variable environement in src/app/services/url.service.ts value either to 'dev' to
connect to test server or 'local' to connect to running local backend
```typescript
export class UrlService {
  environement: string;
  url: string;

  constructor() {
    // this.environement = 'dev';
    this.environement = 'local';
    switch (this.environement) {
      case 'local':
        this.url = 'http://localhost:3000';
        // this.url = 'http://192.168.1.27:3000';
        break;
      case 'dev':
        this.url = 'https://infinite-fjord-33948.herokuapp.com';
        break;
      default:
        break;
    }
  }
}
```
Then run the app on web browser using 
```bash
ionic serve
```



