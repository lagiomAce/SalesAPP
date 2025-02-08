import { Routes } from '@angular/router';
import { SalesPredictionViewComponent } from './components/sales-prediction-view/sales-prediction-view.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

export const routes: Routes = [
    { path: '', component: SalesPredictionViewComponent },
    { path: 'sales-prediction', component: SalesPredictionViewComponent },
    { path: 'orders/:customerId', component: OrdersListComponent }, // Mueve esta línea antes de '**'
    { path: '**', redirectTo: '', pathMatch: 'full' } 
  ];
