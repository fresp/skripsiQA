import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import global from "../global";
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
  ) { }

  //User login
  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        let body = this.utility.formData(data);
        let pathUrl = "";
        if(data.type == "pm") {
            pathUrl = "pm/login";
        } else if(data.type == "qa") {
          pathUrl = "qa/login";
        } else {
          pathUrl = "user/login";
          
        }
        this.http.post(global.url_api + pathUrl, body, options).subscribe(res => {
          console.log(res);
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

}
