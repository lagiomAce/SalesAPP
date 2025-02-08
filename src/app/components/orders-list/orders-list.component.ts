import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule,Location} from '@angular/common';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  imports:[FormsModule,MatTableModule, MatPaginatorModule,CommonModule]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['orderId', 'shipName', 'shipAddress', 'requiredDate', 'shippedDate'];
  customerName: string = '';

  constructor(private route: ActivatedRoute, private orderService: OrderService,private location: Location) {}

  ngOnInit() {
    debugger
    const customerIdString = this.route.snapshot.paramMap.get('customerId');
    const nameFromRoute = this.route.snapshot.queryParamMap.get('customerName');
    const customerId = Number(customerIdString);

    if (nameFromRoute) {
      this.customerName = nameFromRoute; // Usa el nombre pasado por la vista anterior
    }
    if (customerId) {
      this.orderService.getOrdersByCustomerId(customerId).subscribe((data) => {
        this.orders = data;
      });

      
    }
  }
  goBack() {
    this.location.back(); // Regresa a la página anterior
  }
}
