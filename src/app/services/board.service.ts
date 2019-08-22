import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  locstor = localStorage.getItem(global.user_db);
  json_locstor = JSON.parse(this.locstor);
  
  
  //Invited Alumni Get List
  listData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'board/get_list', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Get Detail
  detailData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'board/', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Insert
  insertData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({

          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : 'bearer '+this.json_locstor.tokens,
        });
        let options = {headers: headers};
        // const body = new FormData();

        let body = this.utility.formData(data);
        // // let body = this.utility.formData(data);
        // body.append("code", data.code);
        // body.append("title", data.title);
        // body.append("description", data.description);
        // body.append("status", data.status);

        this.http.post(global.url_api + 'board/create', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Edit
  editData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : 'bearer '+this.json_locstor.tokens,
        });
        let options = {headers: headers};
       
        let body = this.utility.formData(data);

        this.http.put(global.url_api + 'board/', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete Invited Alumni
  deleteData(data: any): Promise<any> {
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

        this.http.delete(global.url_api + 'board', options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Import
  importData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        if (data.files != "" || data.files != null) {
          body.append("files", data.files, data.files.name);
        }

        this.http.post(global.url_api + 'board/import', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  AllUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'board/topAllUser', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  AllClass(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'bearer '+this.json_locstor.tokens,
          });
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'class/topAll', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
