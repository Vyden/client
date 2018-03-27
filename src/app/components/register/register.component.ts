import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string
  public password: string
  public fullName: string
  public isInstructor: boolean
  public authData: any
  public user: User

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.currentUserObservable
      .subscribe(user => this.user = user)
  }

  public createUser() {
    const userInfo: UserInfo = {
      fullName: this.fullName,
      courses: [],
      isInstructor: !!this.isInstructor
    }

    this._authService.createUser(this.email, this.password, userInfo)
      .then(data => {
        console.log(data)
        this._authService.loginUserEmail(this.email, this.password)
      })
      .catch(err => alert(err))
  }

}
