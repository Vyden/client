import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/* Services */
import { AuthService } from '../../services/auth/auth.service';

/* Models */
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// export class LoginFormComponent {

//   applogin: FormGroup;

//   constructor(private fb: FormBuilder) {
//       this.applogin = fb.group({
//           defaultFormEmail: ['', Validators.required],
//           defaultFormPass: ['', [Validators.required, Validators.minLength(8)]]
//       });
//   }
// }

export class LoginComponent implements OnInit {

  public email: string
  public password: string
  public fullName: string
  public isInstructor: boolean
  public authData: any

  
  constructor(private _authService: AuthService, private _router: Router) { }

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
  }

}
