import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) {
    // console.log('got here');
   }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent, {
            width: '450px',
            // height: '500px'
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

}
