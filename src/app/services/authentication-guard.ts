import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastController: ToastController,
  ) { }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('chatToken');
    if (token && token.length > 0) {
      return true;
    } else {
      this.router.navigate(['login']);
      const toast = await this.toastController.create({
        color: 'danger',
        message: 'You are not logged in',
        duration: 2000
      });
      toast.present();
    }
  }

}
