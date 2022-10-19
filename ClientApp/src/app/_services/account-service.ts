import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { OTP, User,UpdatePwdDto } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: User) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((responce: any) => {
        const user = responce;
        if (user) {
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
          this.setCurrentUser(user);
        }
      })

    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          //localStorage.setItem('user', JSON.stringify(responce));
          //this.currentUserSource.next(user);
          
          if(!localStorage.getItem('user'))
              this.setCurrentUser(user);

        }
      })
      ,
      catchError((error) => {
        console.log('error caught in service')
        // console.error(error.error);
        //  this.toastr.error(error.error);

        return throwError(() => new Error(error));
      })
    );
  }

  setCurrentUser(user: User) {
    //add roles
    user.roles = [];
    const role = this.getDecodedToken(user.token).role;
    //check multi roles array of single string role
    Array.isArray(role) ? user.roles = role : user.roles.push(role);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);

  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    //var k: any =JSON.parse(Buffer.from(token.split('.')[1],'base64'))
    return JSON.parse(atob(token.split('.')[1]))
  }

  savesendOtp(mobile: string) {
    return this.http.post(this.baseUrl + 'otp/savesendotp/' + mobile, {});
    // .pipe( 
    //   map((res: any) => {
    //       console.log(res);
    //   }),
    //   catchError((err) => {
    //     console.log('error caught in service')
    //     console.error(err);
    //     return throwError(()=>{new Error(err)});
    //   }));
  }

  sendOtp(phonenumber: string) {
    return this.http.post(this.baseUrl + 'otp/sendotp/' + phonenumber, {});    
  }

  VerifyOtp(phonenumber: OTP) {
    return this.http.post(this.baseUrl + 'otp/verifyotp', phonenumber);
  }

  VerifyForgotPwd(model: OTP) {
    return this.http.post<any>(this.baseUrl + 'account/forgot-pwd', model);
  }

  UpdatePassword(model:UpdatePwdDto){
    return this.http.post(this.baseUrl + 'account/update-pwd', model)
  }

}
