import { CommonModule } from '@angular/common';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css',
  imports:[FormsModule,MatTableModule,CommonModule,MatGridListModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatDatepickerModule ]
})
export class NewOrderComponent {
  @Output() orderCreated = new EventEmitter<any>();
  newOrderData: any = {};

  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newOrderData = { ...data.newOrderData };
  }

  createOrder(): void {
    console.log("Enviando datos al componente padre:", this.newOrderData);
    this.dialogRef.close(this.newOrderData);  
  }

  getGridCols(): number {
    return window.innerWidth > 1024 ? 3 : 2;
  }

  close(): void {
    this.dialogRef.close();
  }
}

