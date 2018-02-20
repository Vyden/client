import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) {
    // console.log('got here');
   }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

}
