import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private _afAuth: AngularFireAuth) {
    this._afAuth.authState.subscribe((auth) => {
      this.authState = auth
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
  get currentUserObservable(): any {
    return this._afAuth.authState
  }

  public createUser(email: string, password: string) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
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

}
