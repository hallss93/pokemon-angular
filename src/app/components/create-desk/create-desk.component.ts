import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Desk } from '../../interfaces/desk.interface';

@Component({
  selector: 'pk-create-desk',
  standalone: true,
  templateUrl: './create-desk.component.html',
  styleUrl: './create-desk.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CreateDeskComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateDeskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Desk
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
