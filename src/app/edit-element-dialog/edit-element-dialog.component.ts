import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../app.component';

@Component({
  selector: 'app-edit-element-dialog',
  template: `
    <h1 mat-dialog-title>Edit Element</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Weight</mat-label>
        <input matInput [(ngModel)]="data.weight" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Symbol</mat-label>
        <input matInput [(ngModel)]="data.symbol" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data">Save</button>
    </div>
  `
})
export class EditElementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
