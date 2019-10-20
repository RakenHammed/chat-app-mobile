import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController, Events, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    private events: Events,
    public loadingController: LoadingController,
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(
          // tslint:disable-next-line: max-line-length
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async signup() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'custom-loader-class',
      showBackdrop: false,
    });
    await loading.present();
    const params: {
      email: string,
      password: string,
      lastName: string,
      firstName: string,
    } = this.signupForm.value;
    this.userService.signup(params).subscribe(
      async res => {
        localStorage.setItem('chatToken', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.events.publish('user:logged', res.user);
        this.router.navigate(['home'], { replaceUrl: true });
        await this.loadingController.dismiss();
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Login successful',
          duration: 2000
        });
        toast.present();
      },
      async err => {
        await this.loadingController.dismiss();
        const toast = await this.toastController.create({
          color: 'danger',
          message: err.error.message,
          duration: 2000
        });
        toast.present();
      }
    );
  }
}
