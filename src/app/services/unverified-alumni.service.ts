import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilityService } from './utility.service';
import global from "../global";

@Injectable({
  providedIn: 'root'
})
export class UnverifiedAlumniService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }
  
  //Unverified Alumni Get List
  listUnverifiedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/get_list_unverified', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Unverified Alumni Get Detail
  detailUnverifiedAlumni(data: any): Promise<any> {
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

  //Unverified Alumni Edit
  editUnverifiedAlumni(data: any): Promise<any> {
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

  //Verify Alumni Get Detail
  verifyUnverifiedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/change_status', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  //Reject Alumni Get Detail
  rejectUnverifiedAlumni(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);

        this.http.post(global.url_api + 'user/change_status', body, options).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
  
}
