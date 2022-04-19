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

  user : any;
  id : string;
  
  

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

   
    onSubmit (){
    const { name,email, phone } = this.form.value;
    const user: User= { name,phone, email };
    return this.updateUser(this.user);
    this.router.navigateByUrl('/tabs/tab1');


    }
    

    updateUser(UserId: number) {
      return this.http
        .put(
          `${environment.baseApiUrl}/user/updateUser/62596aaec11d45ddfddf2cc8`,
          this.httpOptions
        )
        .pipe(take(1));
    }

    
    /**decodeToken = (token: string): User | any =>
    token ? jwt_decode(token) : null;*/

}
