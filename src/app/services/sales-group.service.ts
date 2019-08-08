import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class SalesGroupService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  //User login
  getList(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'sales/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Company Get All
  AllSales(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'sales/get_all', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
  
}
