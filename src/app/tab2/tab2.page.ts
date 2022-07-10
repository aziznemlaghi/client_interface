import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { ReservationService } from './services/reservation.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataReservations: any[] = [];
  reservation: any;
  reservations: any;

  constructor(private  reservationService: ReservationService, private http: HttpClient ,
              private authservice: AuthService,
              private toast: ToastController) {

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit() {
    const key = await this.authservice.getToken() ;
    const user = this.authservice.decodeToken(key as string);
    console.log('******',user);
    console.log(user.user.id);
    this.getByUser(user.user.id).subscribe(res=>{
      this.reservations = res;
      console.log(res);
    });

  }



  getByUser(userId: number) {

     return this.http.get(
         `${environment.baseApiUrl}/reservation/findReservationByUser/${userId}`

     );
   }


  // eslint-disable-next-line @typescript-eslint/naming-convention
  CancelReservation(reservation: any) {
    this.reservationService.cancelReservation(reservation)
      .subscribe(async data => {
        const toast = await this.toast.create({
          color: 'success',
          icon: 'checkmark-circle-outline',
          message: 'Reservation canceled successfully',
          position: 'bottom',
          duration: 2000
        });
        toast.present();
        console.log('success');
        this.ngOnInit();
      });
  }




}
