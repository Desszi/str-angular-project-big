import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { CustomerListComponent } from "./page/customer-list/customer-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ProductsListComponent } from "./page/products-list/products-list.component";
import { EditProductComponent } from "./page/edit-product/edit-product.component";
import { AddressListComponent } from "./page/address-list/address-list.component";
import { BillListComponent } from "./page/bill-list/bill-list.component";
import { OrderListComponent } from './page/order-list/order-list.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './common/loading/loading.component';
import { SearchPipe } from '../app/pipe/search.pipe';
import { SortPipe } from '../app/pipe/sort.pipe';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditBillComponent } from "./page/edit-bill/edit-bill.component";
import { InfoCardComponent } from './common/info-card/info-card.component';
import { SwitchPipe } from './pipe/switch.pipe';
import { EditAddressComponent } from './page/edit-address/edit-address.component';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductsListComponent,
    EditProductComponent,
    AddressListComponent,
    BillListComponent,
    OrderListComponent,
    CustomerListComponent,
    LoadingComponent,
    SearchPipe,
    SortPipe,
    EditCustomerComponent,
    EditOrderComponent,
    EditBillComponent,
    InfoCardComponent,
    DashboardComponent,
    SwitchPipe,
    EditAddressComponent,
    FilterPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
