import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.scss']
// })
// export class ConfirmDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

@Component({
  selector: 'confirm-dialog',
  template: `
      <p>{{ title }}</p>
      <p>{{ message }}</p>
      <button type="button" md-raised-button 
          (click)="dialogRef.close(true)">OK</button>
      <button type="button" md-button 
          (click)="dialogRef.close()">Cancel</button>
  `,
})
export class ConfirmDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }
}