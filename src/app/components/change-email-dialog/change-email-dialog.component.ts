import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-change-email-dialog',
  templateUrl: './change-email-dialog.component.html',
  styleUrls: ['./change-email-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeEmailDialogComponent implements OnInit {

  /* Error Messages */
  public showError: boolean
  public errorMessage: string = "test error"

  /* Passwords */
  public oldEmail: string
  public newEmail: string
  public password: string

  /* User */
  public authState: any

  /* Form validation */
  public oldEmailControl: FormControl
  public newEmailControl: FormControl
  public passwordControl: FormControl
  public matcher: ESM


  constructor(private _authService: AuthService,
    private _afAuth: AngularFireAuth,
    private _dialogRef: MatDialogRef<ChangeEmailDialogComponent>) {
    this.oldEmailControl = new FormControl('', [
      Validators.required,
    ]);

    this.newEmailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordControl = new FormControl('', [
      Validators.required,
    ]);

    this.matcher = new ESM();
  }

  ngOnInit() {
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        this.authState = user
        this.oldEmail = this.authState.email
      })
  }

  public confirmChange() {
    this.showError = false
    this.errorMessage = ""

    /* Fields are empty */
    if (!this.oldEmail || !this.newEmail || !this.password) {
      this.showError = true
      this.errorMessage = "Please fill out empty fields"
      return
    }

    this._afAuth.auth.signInWithEmailAndPassword(this.oldEmail, this.password)
      .then((user: any) => {
        console.log('user', user);
        this.authState.updateEmail(this.newEmail)
        this._dialogRef.close(true)
      })
      .catch((error: any) => {
        console.log('error', error.message);
        this.showError = true
        this.errorMessage = error
      })

  }

}

export class ESM implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}