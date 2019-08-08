import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  //Brand Get List
  listBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'brand/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Brand Get All
  AllBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'brand/get_all', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Brand Insert
  insertBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append("company_id", data.company_id);
        body.append("name", data.name);
        body.append("desc", data.desc);
        body.append("img", data.img, data.img.name);
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);

        this.http.post(global.url_api + 'brand/insert', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Brand Get Detail
  detailBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'brand/get_detail', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Brand Edit
  editBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append("company_id", data.company_id);
        body.append("name", data.name);
        body.append("desc", data.desc);
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        body.append("id", data.id);

        this.http.post(global.url_api + 'brand/update', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete Brand
  deleteBrand(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'brand/delete', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
