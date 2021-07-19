import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserDetails } from '../models/UserDetails';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse>{
    return this.http.post<SuccessfulLoginServerResponse>
                          (`http://${environment.apiUrl}/api/users/login`, userLoginDetails);
  }

  public oauthLogin(token): Observable<SuccessfulLoginServerResponse>{    
    return this.http.post<SuccessfulLoginServerResponse>
                          (`http://${environment.apiUrl}/api/users/google-login`, token);
  }

  public register(userRegisterDetails : UserRegisterDetails): Observable<void>{
    return this.http.post<void>(`http://${environment.apiUrl}/api/users/register`, userRegisterDetails);
  }

  public getUserInfo(): Promise<UserDetails>{
    return this.http.get<UserDetails>(`http://${environment.apiUrl}/api/users/me`).toPromise();
  }

  public isUserAlreadyExist(userRegisterDetails : UserRegisterDetails): Observable<boolean>{    
    return this.http.post<boolean>(`http://${environment.apiUrl}/api/users/user-exists`, userRegisterDetails);
  }
  
  public updateUserDetails(userDetails : UserRegisterDetails): Observable<void>{
    return this.http.put<void>(`http://${environment.apiUrl}/api/users/update`, userDetails);
  }

}