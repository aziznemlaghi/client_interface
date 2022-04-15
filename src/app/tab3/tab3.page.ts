import { Component } from '@angular/core';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { getToken } from '../helper/getToken';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user : any;

  

  constructor(    private authService: AuthService,
    ) {

      this.setUser();
    }

    

    async onSignOut() {
      this.authService.logout();
    }
    

    setUser (){
      this.user = this.authService.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBob25lIjoxODE4MTgxOCwibmFtZSI6ImJydW5vIiwiZW1haWwiOiJicnVub0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2NTAwMjc3MjksImV4cCI6MTY1MDAzMTMyOX0.jQNmqraZBk5mAiqSeaImFMaTQGwOn7hnvPv2sBUyS6c')
    console.log('******',this.user);
    }

    /**decodeToken = (token: string): User | any =>
    token ? jwt_decode(token) : null;*/

}
