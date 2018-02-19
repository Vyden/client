import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-templogin',
  templateUrl: './templogin.component.html',
  styleUrls: ['./templogin.component.scss']
})
export class TemploginComponent implements OnInit {

  public email: string
  public password: string
  public authData: any

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.currentUserObservable
      .subscribe(user => console.log(user))
  }

  public createUser() {
    this._authService.createUser(this.email, this.password)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  public loginUser() {
    this._authService.loginUserEmail(this.email, this.password)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

}
