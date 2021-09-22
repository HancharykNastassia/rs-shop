import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetails } from '../../models/user';

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: './update-order-dialog.component.html',
  styleUrls: ['./update-order-dialog.component.scss']
})
export class UpdateOrderDialogComponent {
  @Input() message?: string;
  constructor(public dialogRef: MatDialogRef<UpdateOrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:{id: string, orderDetails: OrderDetails}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEmmitedValue(value: string): void {
    this.message = value;
  }
}
