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
  { path: "/address-list", title: "Címek", icon: "library_books", class: "" },
  { path: "/bill-list", title: "Pénztár", icon: "credit_score", class: "" },
  { path: '/order-list', title: 'Rendelések', icon: 'border_color', class: '' },
  { path: '/customer-list', title: 'Vásárlók', icon: 'people', class: '' },
  { path: '/about', title: 'Rólunk', icon: 'settings_accessibility', class: '' },

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
