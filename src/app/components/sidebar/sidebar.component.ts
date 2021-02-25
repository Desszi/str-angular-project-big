import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  { path: "/product-list", title: "Termékek", icon: "content_paste", class: "" },
  { path: "/address-list", title: "Csak a címek", icon: "library_books", class: "" },
  { path: "/bill-list", title: "Bill List", icon: "receipt", class: "" },
  { path: '/order-list', title: 'Order', icon: 'location_on', class: '' },
  { path: '/customer-list', title: 'Vásárlók', icon: 'library_books', class: '' },

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
