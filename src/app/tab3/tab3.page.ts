import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;
  id: string;



  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    Authorization: 'token'
  }),
  };

  @ViewChild('form') form: NgForm;

  constructor(private authService: AuthService,private http: HttpClient, private router: Router
    ) {

      this.setUser();


    }



    async onSignOut() {
      this.authService.logout();
    }


    async setUser(){
    const key = await this.authService.getToken() ;
    this.user = this.authService.decodeToken(key as string);
    console.log('******',this.user);
    }


    onSubmit(){
    const user = {
      name: this.form.value.name,
      email:this.form.value.email,
      phone:this.form.value.phone};

   this.updateUser(this.user.id,user).subscribe(
     (res)=>{
       console.log('successfully updated',res);
     },
     (err)=>{
       console.log('error update',err);
       console.log(user);
     }
   );
    this.router.navigateByUrl('/tabs/tab1');
    }



 updateUser( UserId: number,element: any) {
      return this.http
        .patch(
          `${environment.baseApiUrl}/user/updateUser/${UserId}`,
          this.httpOptions
        )
        .pipe(take(1));
    }



    /**decodeToken = (token: string): User | any =>
    token ? jwt_decode(token) :  null;*/

}
