import { Injectable } from '@angular/core';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // Convert object into URL
  formData(data): string{
    return Object.keys(data).map(function(key){
      if(Array.isArray(data[key])) {
        return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
      } else {
        return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
      }
    }).join('&');
  }
}
