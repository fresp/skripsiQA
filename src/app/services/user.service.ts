import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }
  
  //User Get List
  listUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Get Detail
  detailUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/get_detail', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Insert
  insertUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();
        // let body = this.utility.formData(data);
    
        body.append("company_id", data.company_id);
        body.append("salesgroup_id", data.salesgroup_id);
        body.append("employee_no", data.employee_no);
        body.append("img", data.img, data.img.name);
        body.append("firstname", data.firstname);
        body.append("lastname", data.lastname);
        body.append("phone", data.phone);
        body.append("email", data.email);
        body.append("password", data.password);
        body.append("role", data.role);
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);

        this.http.post(global.url_api + 'user/insert', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Edit
  editUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();
    
        body.append("company_id", data.company_id);
        body.append("salesgroup_id", data.salesgroup_id);
        body.append("employee_no", data.employee_no);
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("firstname", data.firstname);
        body.append("lastname", data.lastname);
        body.append("phone", data.phone);
        body.append("email", data.email);
        if (data.password != "" || data.password != null) {
          body.append("password", data.password);
        }
        body.append("role", data.role);
        body.append("publish", data.publish);
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        body.append("salt", data.salt);
        body.append("id", data.id);

        this.http.post(global.url_api + 'user/update', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete User
  deleteUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/delete', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
