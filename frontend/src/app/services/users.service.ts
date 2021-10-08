import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/UserDetails';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  public login(userLoginDetails: UserLoginDetails): Observable<UserDetails>{
    return this.http.post<UserDetails>
                          (`/api/users/login`, userLoginDetails);
  }

  public oauthLogin(token): Observable<UserDetails>{    
    return this.http.post<UserDetails>
                          (`/api/users/google-login`, token);
  }

  public register(userRegisterDetails : UserRegisterDetails): Observable<void>{
    return this.http.post<void>(`/api/users/register`, userRegisterDetails);
  }

  public getUserInfo(): Promise<UserDetails>{
    return this.http.get<UserDetails>(`/api/users/me`).toPromise();
  }

  public isUserAlreadyExist(userRegisterDetails : UserRegisterDetails): Observable<boolean>{    
    return this.http.post<boolean>(`/api/users/user-exists`, userRegisterDetails);
  }
  
  public updateUserDetails(userDetails : UserRegisterDetails): Observable<void>{
    return this.http.put<void>(`/api/users/update`, userDetails);
  }

  public logout(): Observable<void>{
    return this.http.delete<void>(`/api/users/logout`, {withCredentials:true});
  }

}