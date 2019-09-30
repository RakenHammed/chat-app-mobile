import { Component, OnInit } from '@angular/core';

import { Platform, Events, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  user;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private menu: MenuController,
  ) {
    this.initializeApp();
    this.events.subscribe('user:logged', (user) => {
      this.user = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  disconnect() {
    localStorage.clear();
  }

  async closeMenu() {
    await this.menu.close();
  }

}
