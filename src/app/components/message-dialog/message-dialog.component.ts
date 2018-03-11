import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/* Models */
import { DialogOptions, DialogButton } from '../../models/dialogOptions';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  public dialogOptions: DialogOptions

  constructor(private _dialogRef: MatDialogRef<MessageDialogComponent>) { }

  ngOnInit() {
    console.log(this.dialogOptions);
  }

  public close(returnVal?: any) {
    this._dialogRef.close(returnVal)
  }

}
