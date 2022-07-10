import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from './models/newUser.model';

import { AuthService } from './services/auth.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form') form: NgForm;

  submissionType: 'login' | 'join' = 'login';

  constructor(private authService: AuthService, private router: Router, private toast : ToastController) {}

  ngOnInit() {}

  onSubmit() {
    const { email, password } = this.form.value;
    if (!email || !password) {return;}

    if (this.submissionType === 'login') {
      return this.authService.login(email, password).subscribe(async (res) => {
        const toast = await this.toast.create({
          color: 'success',
          icon: 'checkmark-circle-outline',
          message: 'Logged in successfully',
          position: 'bottom',
          duration: 1000

        });
        toast.present();
        this.router.navigateByUrl('/tabs/tab1');
      });
    }
    else if (this.submissionType === 'join') {
      const { name, phone } = this.form.value;
      if (!phone || !name) {return;}

      const newUser: NewUser = { name,phone, email, password };

      return this.authService.register(newUser).subscribe(
        async (res) => {
          const toast = await this.toast.create({
            color: 'success',
            icon: 'checkmark-circle-outline',
            message: 'Account created successfully',
            position: 'bottom',
            duration: 2000

          });
          toast.present();
          this.toggleText();
        },
        async (err) => {
          const toast = await this.toast.create({
            header : 'Failed',
            color: 'danger',
            icon: 'checkmark-circle-outline',
            message: 'Email already exists',
            position: 'bottom',
            duration: 2000

          });
          toast.present();
        }
      );
    }
  }

  toggleText() {
    if (this.submissionType === 'login') {
      this.submissionType = 'join';
    } else if (this.submissionType === 'join') {
      this.submissionType = 'login';
    }
  }
}
