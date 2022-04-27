import { Component, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { ApiService } from './services/service1.service';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {



  dataServices: any[] = [];

  constructor(public api: ApiService, private popoverController : PopoverController) {
    this.getDataService();

  }

  ngOnInit() {
  }

  getDataService() {
    this.api.getDataService()
      .subscribe(res => {
        console.log(res);
        this.dataServices = res;
        console.log(this.dataServices);
      }, err => {
        console.log(err);
      });
  }

 
  
  async DismissClick() {
      } 
    




}