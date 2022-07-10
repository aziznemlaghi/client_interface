import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;
  id: string;
profile : any;


  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization: 'token'
  }),
  };

  @ViewChild('form') form: NgForm;

  constructor(private authService: AuthService,private http: HttpClient, private router: Router,private toast: ToastController
    ) {

      this.setUser();



    }



    async onSignOut() {
      this.authService.logout();
    }


    async setUser(){
    const key = await this.authService.getToken() ;
    this.user = this.authService.decodeToken(key as string);
    this.getUserbyId();
    console.log('******',this.user);
    }


    onSubmit(){
    const user = {
      name: this.form.value.name,
      email:this.form.value.email,
      phone:this.form.value.phone};


   this.updateUser(this.user.user.id,user).subscribe(
     async (res) => {
       const toast = await this.toast.create({
         color: 'success',
         icon: 'checkmark-circle-outline',
         message: 'Profile updated successfully',
         position: 'bottom',
         duration: 2000

       });
       toast.present();
       console.log('successfully updated', res);
       this.getUserbyId();
     },
     (err)=>{
       console.log('error update',err);
       console.log(user);
     }
   );
    }



// @ts-ignore
getUserbyId(){
  this.getUser(this.user.user.id).subscribe(
(res)=>{
  console.log('****pppp',res);
  this.profile = res;
}
);
}
  // eslint-disable-next-line @typescript-eslint/naming-convention
 updateUser( UserId: string,element: any) {
      return this.http
        .patch(
          `${environment.baseApiUrl}/user/updateUser/${UserId}`,element,
          this.httpOptions
        )
        .pipe(take(1));
    }


  getUser( UserId: string) {
    return this.http
      .get(
        `${environment.baseApiUrl}/user/${UserId}`
      )
      .pipe(take(1));
  }



    /**decodeToken = (token: string): User | any =>
    token ? jwt_decode(token) :  null;*/

}
