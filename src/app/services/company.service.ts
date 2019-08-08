import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

        this.http.post(global.url_api + 'company/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Company Get All
  AllCompany(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'company/get_all', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
}
