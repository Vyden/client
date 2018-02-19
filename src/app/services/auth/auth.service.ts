import { Injectable } from '@angular/core';
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

  constructor(private _afAuth: AngularFireAuth, private _firebase: AngularFireDatabase) {
    this._afAuth.authState.subscribe((user) => {
      this.authState = user
      console.log('user id: ', user.uid);

      if(!user) return
      this._firebase.object("UserInfo/" + user.uid)
        .valueChanges()
        .subscribe((userInfo: UserInfo) => {
          console.log('user info', userInfo);
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
      .catch(error => console.log(error))
  }

  public loginUserEmail(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user
      })
      .catch(error => console.log(error))
  }

  public changeUserInfo(newUserInfo: UserInfo) {
    this.currentUserInfoSource.next(newUserInfo)
  }

}
