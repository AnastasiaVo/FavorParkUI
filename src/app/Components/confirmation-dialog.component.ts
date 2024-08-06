import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MaterialModule,
],
  template: `
    <h2 mat-dialog-title>Booking Confirmation</h2>
    <mat-dialog-content>Your room has been booked successfully!</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
