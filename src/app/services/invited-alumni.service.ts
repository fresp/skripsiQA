import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class InvitedAlumniService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }
  
  //Invited Alumni Get List
  listInvitedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/get_list_invited', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //User Get Detail
  detailInvitedAlumni(data: any): Promise<any> {
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

  //Invited Alumni Insert
  insertInvitedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();
        // let body = this.utility.formData(data);

        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        body.append("type", data.type_alumni);
        body.append("name", data.alumni_name);
        body.append("email", data.email);
        body.append("gender", data.gender);
        if (data.company != "" || data.company != null) {
          body.append("company", data.company);
        }
        if (data.position != "" || data.position != null) {
          body.append("position", data.position);
        }
        if (data.phone != "" || data.phone != null) {
          body.append("phone", data.phone);
        }
        if (data.dob != "" || data.dob != null) {
          body.append("dob", data.dob);
        }
        if (data.lineservice_id != "" || data.lineservice_id != null) {
          body.append("lineservice_id", data.lineservice_id);
        }
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("publish", data.publish);

        this.http.post(global.url_api + 'user/create', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Edit
  editInvitedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();
    
        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        body.append("type", data.type_alumni);
        body.append("name", data.alumni_name);
        body.append("email", data.email);
        body.append("gender", data.gender);
        if (data.company != "" || data.company != null) {
          body.append("company", data.company);
        }
        if (data.position != "" || data.position != null) {
          body.append("position", data.position);
        }
        if (data.phone != "" || data.phone != null) {
          body.append("phone", data.phone);
        }
        if (data.dob != "" || data.dob != null) {
          body.append("dob", data.dob);
        }
        if (data.lineservice_id != "" || data.lineservice_id != null) {
          body.append("lineservice_id", data.lineservice_id);
        }
        if (data.img != "" || data.img != null) {
          body.append("img", data.img, data.img.name);
        }
        body.append("publish", data.publish);
        body.append("id", data.id);

        this.http.put(global.url_api + 'user/', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Delete Invited Alumni
  deleteInvitedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let httpParams = new HttpParams()
            .append('user_id', data.user_id)
            .append('auth_code', data.auth_code)
            .append('id', data.id);
            // httpParams.set('user_id', data.user_id);
            // httpParams.set('auth_code', data.auth_code);
            // httpParams.set('id', data.id);
        let options = {headers: headers, params: httpParams};
        console.log(options);

        this.http.delete(global.url_api + 'user', options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Invited Alumni Import
  importInvitedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const body = new FormData();

        body.append("user_id", data.user_id);
        body.append("auth_code", data.auth_code);
        if (data.files != "" || data.files != null) {
          body.append("files", data.files, data.files.name);
        }

        this.http.post(global.url_api + 'user/import', body).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
