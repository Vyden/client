import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../models/userInfo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  authState: any = null;

  private currentUserInfoSource = new BehaviorSubject<UserInfo>(null)
  public currentUserInfo = this.currentUserInfoSource.asObservable()

  constructor(private _afAuth: AngularFireAuth, private _firebase: AngularFireDatabase, private _router: Router) {
    this._afAuth.authState.subscribe((user) => {
      this.authState = user

      if(!user) {
        this.changeUserInfo(null)
        return
      }

      this._firebase.object("UserInfo/" + user.uid)
        .valueChanges()
        .subscribe((userInfo: UserInfo) => {
          this.changeUserInfo(userInfo)
        })
    });
  }

  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.isAuthenticated ? this.authState : null;
  }

  // Returns observable
  get currentUserObservable(): Observable<any> {
    return this._afAuth.authState
  }

  public createUser(email: string, password: string, info: UserInfo) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        console.log('Create user success:', user);

        info.UID = user.uid

        this._firebase.list('UserInfo')
          .set(user.uid, info)

        this.authState = user
      })
      .catch(error => alert(error))
  }

  public loginUserEmail(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user
        this._router.navigate([''])
      })
      .catch(error => alert(error))
  }

  public changeUserInfo(newUserInfo: UserInfo) {
    this.currentUserInfoSource.next(newUserInfo)
  }

  public checkLogin() {
    if(!this.authState) {
      // User is not logged in, so go to the login page
      this.logout()
    }
  }

  public logout() {
    this._afAuth.auth.signOut()
    this.clearLocalStorage()
    this._router.navigate(['login'])
  }

  private clearLocalStorage() {
    localStorage.removeItem('filter')
  }

}
