import { Component } from '@angular/core';
import { ApiService } from './services/service1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dataServices: any[] = [];

  constructor(public api: ApiService) {
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



}
