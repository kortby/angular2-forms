import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSheetComponent } from './order-sheet/order-sheet.component';

const routes: Routes = [{ path: '', component: OrderSheetComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
