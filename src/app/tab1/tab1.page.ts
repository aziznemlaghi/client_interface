import { Component, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { ApiService } from './services/service1.service';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import {IonModalPage} from '../ion-modal/ion-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  format = 'HH:mm';
  dataServices: any[] = [];
  private reservation: any ;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  showPicker = false;
  @ViewChild(IonDatetime) datetime: IonDatetime;
  date: Date;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public myDate: any;
  constructor(public api: ApiService , private modalCtrl: ModalController) {
    this.getDataService();

  }


  getDataService() {
    this.api.getDataService()
      .subscribe(res => {
        this.dataServices = res;
        console.log(this.dataServices);
      }, err => {
        console.log(err);
      });
  }













  close() {
this.modalCtrl.dismiss({
  dismissed : true
});  }

  confirm() {
console.log('date :',this.myDate);
  }

  async openModal(id: string) {
    console.log('res id : ', id);
    const modal = await this.modalCtrl.create({
        component: IonModalPage,
        componentProps : {
          service : id,
}
      }
    );
    return await modal.present();

  }
}
