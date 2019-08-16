import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";


@Injectable({
  providedIn: 'root'
})
export class UserPmService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  
  //Invited Alumni Get List
  listProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'pm/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Get Detail
  detailProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'pm/detail', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Insert
  insertProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Authorization' : 'bearer '+this.json_locstor.tokens,
        });
        let options = {headers: headers};
        const body = new FormData();
        // let body = this.utility.formData(data);
        body.append("email", data.email);
        body.append("firstname", data.firstname);
        body.append("lastname", data.lastname);
        body.append("password", data.password);
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("status", data.status);

        this.http.post(global.url_api + 'pm/register', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Edit
  editProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Authorization' : 'bearer '+this.json_locstor.tokens,
        });
        let options = {headers: headers};
        const body = new FormData();
    
        body.append("firstname", data.firstname);
        body.append("lastname", data.lastname);
        body.append("email", data.email);
        body.append("status", data.status);
     
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("id", data.id);

        this.http.put(global.url_api + 'pm/', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete Invited Alumni
  deleteProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let httpParams = new HttpParams()
            .append('id', data.id);
            // httpParams.set('user_id', data.user_id);
            // httpParams.set('auth_code', data.auth_code);
            // httpParams.set('id', data.id);
        let options = {headers: headers, params: httpParams};
        console.log(options);

        this.http.delete(global.url_api + 'pm', options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Import
  importProjectManager(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        if (data.files != "" || data.files != null) {
          body.append("files", data.files, data.files.name);
        }

        this.http.post(global.url_api + 'pm/import', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
