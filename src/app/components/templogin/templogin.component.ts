import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'app-templogin',
  templateUrl: './templogin.component.html',
  styleUrls: ['./templogin.component.scss']
})
export class TemploginComponent implements OnInit {

  public email: string
  public password: string
  public fullName: string
  public isInstructor: boolean
  public authData: any

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.currentUserObservable
      .subscribe(user => console.log(user))
  }

  public createUser() {
    const userInfo: UserInfo = {
      fullName: this.fullName,
      courses: [],
      isInstructor: !!this.isInstructor
    }

    this._authService.createUser(this.email, this.password, userInfo)
      .then(data => console.log(data))
      .catch(err => alert(err))
  }

  public loginUser() {
    this._authService.loginUserEmail(this.email, this.password)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

}
