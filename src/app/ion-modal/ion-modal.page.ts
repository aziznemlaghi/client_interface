import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../auth/services/auth.service';
import {ApiService} from '../tab1/services/service1.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ion-modal',
  templateUrl: './ion-modal.page.html',
  styleUrls: ['./ion-modal.page.scss'],
})
export class IonModalPage implements OnInit {

  @Input() service: any;
  user: any;
  myDate = new Date().toISOString();

  // eslint-disable-next-line max-len
  constructor(private modalCtrl: ModalController,
              private http: HttpClient,
              private authService: AuthService,
              private res: ApiService,
              private toast: ToastController) { }

  ngOnInit() {
    console.log(this.service);
    this.setUser();


  }

  close() {

    this.modalCtrl.dismiss();

  }

  confirm() {


    const user: string = this.user.id;
    const date  = this.myDate;
    const service = this.service;

    const reservation: any = {user, service, date};
    this.res.createReservation(reservation).subscribe(
      async (res) => {
        const toast = await this.toast.create({
          color :'success',
          icon: 'checkmark-circle-outline',
          message: 'Reservation created successfully',
          position: 'bottom',
          duration: 2000

        });
        toast.present();
        console.log('success', res);
        this.modalCtrl.dismiss();

      },
      (err) => {
        console.log('error ', err);
        this.modalCtrl.dismiss();

      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  getUser( UserId: any) {
    return this.http
      .get(
        `${environment.baseApiUrl}/user/${UserId}`
      )
      .pipe(take(1));
  }

  getUserbyId(){
    this.getUser(this.user.user.id).subscribe(
      (res)=>{
        this.user = res;
      }
    );
  }

  async setUser(){
    const key = await this.authService.getToken() ;
    this.user = this.authService.decodeToken(key as string);
    this.getUserbyId();
    console.log('******',this.user);
    console.log('User id : ', this.user.user.id );

  }

  doSomething(date) {
    console.log('date', moment(date).format('YYYY-MM-DD')); // 2019-04-22
  }

  dateChanged(date) {
    console.log(date.detail.value);
    console.log(this.myDate);
  }
}
