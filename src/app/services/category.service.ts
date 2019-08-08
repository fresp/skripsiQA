import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }
  
  //Category Get List
  listCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'category/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Category Get All
  AllCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'category/get_all', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Category Get Detail
  detailCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'category/get_detail', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Category Insert
  insertCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        if (data.parent_id != "" || data.parent_id != null) {
          body.append("parent_id", data.parent_id);
        }
        body.append("name", data.name);
        body.append("desc", data.desc);
        body.append("img", data.img, data.img.name);
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);

        this.http.post(global.url_api + 'category/insert', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Category Edit
  editCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        if (data.parent_id != "" || data.parent_id != null) {
          body.append("parent_id", data.parent_id);
        }
        body.append("name", data.name);
        body.append("desc", data.desc);
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        body.append("id", data.id);

        this.http.post(global.url_api + 'category/update', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete Category
  deleteCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'category/delete', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
}
