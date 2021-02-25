import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { AddressListComponent } from "app/common/address-list/address-list.component";
import { EditProductComponent } from "app/common/edit-product/edit-product.component";
import { BillListComponent } from "app/page/bill-list/bill-list.component";
import { OrderListComponent } from '../../page/order-list/order-list.component';
import { CustomerListComponent } from 'app/common/customer-list/customer-list.component';
import { ProductsListComponent } from "app/page/products-list/products-list.component";
import { EditCostumerComponent } from "app/page/edit-costumer/edit-costumer.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "product-list", component: ProductsListComponent },
  { path: "address-list", component: AddressListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "edit-product/:id", component: EditProductComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "bill-list", component: BillListComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'customer-list', component: CustomerListComponent },


  {path: "edit-costumer/:id", component: EditCostumerComponent}
];
