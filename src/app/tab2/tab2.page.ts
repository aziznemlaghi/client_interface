import { Component } from '@angular/core';
import { ReservationService } from './services/reservation.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataReservations: any[] = [];

  constructor(public api: ReservationService) {
    this.getReservations();

  }

  ngOnInit() {
  }

  getReservations() {
     this.api.getReservations()
      .subscribe(res => {
        console.log(res);
        this.dataReservations = res;
		console.log(this.dataReservations);
      }, err => {
        console.log(err);
      });
  }


}
