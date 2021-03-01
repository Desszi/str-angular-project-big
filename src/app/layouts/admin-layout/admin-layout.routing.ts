import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { AddressListComponent } from "app/page/address-list/address-list.component";
import { EditProductComponent } from "app/page/edit-product/edit-product.component";
import { BillListComponent } from "app/page/bill-list/bill-list.component";
import { OrderListComponent } from "../../page/order-list/order-list.component";
import { CustomerListComponent } from "app/page/customer-list/customer-list.component";
import { ProductsListComponent } from "app/page/products-list/products-list.component";
import { EditCustomerComponent } from "app/page/edit-customer/edit-customer.component";
import { EditOrderComponent } from "app/page/edit-order/edit-order.component";
import { EditBillComponent } from "app/page/edit-bill/edit-bill.component";
import { EditAddressComponent } from "app/page/edit-address/edit-address.component";
import { AboutComponent } from "app/page/about/about.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'product-list/edit-product/:id', component: EditProductComponent },
  { path: 'address-list', component: AddressListComponent },
  { path: 'address-list/edit-address/:id', component: EditAddressComponent },
  { path: 'bill-list', component: BillListComponent },
  { path: 'bill-list/edit-bill/:id', component: EditBillComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-list/edit-order/:id', component: EditOrderComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-list/edit-customer/:id', component: EditCustomerComponent },
  { path: 'about', component: AboutComponent },
];
