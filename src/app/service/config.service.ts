import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  apiUrl:string = '';
  constructor(apiUrl:string ){
    this.apiUrl = apiUrl;
  }
}