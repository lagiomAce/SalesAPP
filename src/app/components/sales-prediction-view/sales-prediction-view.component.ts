import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewOrder } from '../../models/new-order';
import { NewOrderComponent } from '../../modals/new-order/new-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-prediction-view',
  templateUrl: './sales-prediction-view.component.html',
  styleUrls: ['./sales-prediction-view.component.css'],
  imports:[FormsModule,MatTableModule, MatPaginatorModule,CommonModule]

})
export class SalesPredictionViewComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextPredictedOrder', 'actions']; 
  dataSource: MatTableDataSource<Customer>;
  searchTerm: string = '';
  selectedCustomer: Customer | null = null;
  selectedCustomerOrders: Order[] = [];
  newOrderDate: string = '';
  newOrderAmount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('ordersModal') ordersModal!: TemplateRef<any>;
  @ViewChild('newOrderModal') newOrderModal!: TemplateRef<any>;
  newOrderData = {
    empID: null,
    shipperID: null,
    shipName: '',
    shipAddress: '',
    shipCity: '',
    shipCountry: '',
    orderDate: '',
    requiredDate: '',
    shippedDate: '',
    freight: '',
    customerID: null,
    productID: null,
    unitPrice: '',
    qty: null,
    discount:''
  };

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router
    
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
  }

  ngOnInit(): void {
    this.loadCustomers();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.dataSource = new MatTableDataSource<Customer>(customers);
  
      setTimeout(() => {
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });
  }

  onSearch(): void {
    this.customerService.searchCustomersByName(this.searchTerm).subscribe((customers) => {
      this.dataSource.data = customers;
    });
  }


  viewOrders(customer: Customer) {
   debugger
    this.router.navigate(['/orders', customer.custId],{
      queryParams: { customerName: customer.customerName }
  });
    
  }

  openNewOrderModal(customer: any): void {
    const dialogRef = this.dialog.open(NewOrderComponent, {
       width: '65vw', 
      maxWidth: '650px',
      data: { customer: customer, newOrderData: this.newOrderData }, 
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(" Datos recibidos al cerrar modal:", result);
        this.createOrder(result);
      }
    });
  }

  createOrder(newOrderData: any): void {
    debugger
    
    if (newOrderData.orderDate) {
      this.newOrderData.orderDate = new Date(newOrderData.orderDate).toISOString();
    }
  
    if (newOrderData.requiredDate) {
      this.newOrderData.requiredDate = new Date(newOrderData.requiredDate).toISOString();
    }
  
    if (newOrderData.shippedDate) {
      this.newOrderData.shippedDate = new Date(newOrderData.shippedDate).toISOString();
    }
  
    console.log('Converted Order Data:', this.newOrderData);
  
   
    const newOrder = {
      empID: newOrderData.empID,
      shipperID: newOrderData.shipperID,
      shipName: newOrderData.shipName,
      shipAddress: newOrderData.shipAddress,
      shipCity: newOrderData.shipCity,
      orderDate: this.newOrderData.orderDate,  
      requiredDate: this.newOrderData.requiredDate,  
      shippedDate: this.newOrderData.shippedDate,  
      freight: newOrderData.freight,
      shipCountry: newOrderData.shipCountry,
      customerID: newOrderData.customerID,
      productID: newOrderData.productID,
      unitPrice: newOrderData.unitPrice,
      qty: newOrderData.qty,
      discount: newOrderData.discount
    };
  
    this.orderService.createOrder(newOrder).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.dialog.closeAll(); 
        this.loadCustomers(); 
      },
      error: (err) => {
        console.error('Error creating order:', err);
      }
    });
  }
}
