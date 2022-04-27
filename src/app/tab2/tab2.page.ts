import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { ReservationService } from './services/reservation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataReservations: any[] = [];
  reservation : any;
  reservations : any;

  constructor(public api: ReservationService, private http: HttpClient ,private authservice : AuthService) {
   
  }

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

 /* getReservations() {
     this.api.getReservations()
      .subscribe(res => {
        console.log(res);
        this.dataReservations = res;
		console.log(this.dataReservations);
      }, err => {
        console.log(err);
      });
  }*/

  getByUser(userId: number) {
    
     return this.http.get(
         `${environment.baseApiUrl}/reservation/findReservationByUser/${userId}`
        
     );
   }
}
