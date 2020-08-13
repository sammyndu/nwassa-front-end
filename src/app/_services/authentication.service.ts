import { ChangePassword } from './../user-profile/models/changePassword.model';
import { UserInfo } from './../user-profile/models/userInfo.model';
import { RegisterModel } from './../navbar/auth/models/register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthResponse } from '@app/_models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserInfo>;
    public currentUserTokenSubject: BehaviorSubject<string>;
    public currentUser: Observable<UserInfo>;
    public currentUserToken: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUserToken')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserToken = this.currentUserTokenSubject.asObservable();
    }

    public get currentUserValue(): UserInfo {
        return this.currentUserSubject.value;
    }

    public get currentUserTokenValue(): string {
        return this.currentUserTokenSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/accounts/login`, { username, password })
            .pipe(map(result => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(result.user));
                localStorage.setItem('currentUserToken', JSON.stringify(result.token));
                this.currentUserSubject.next(result.user);
                this.currentUserTokenSubject.next(result.token);
                return result;
            }));
    }

    register(user: RegisterModel) {
        return this.http.post<any>(`${environment.apiUrl}/accounts/register`, user)
            .pipe(map(authUser => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(authUser.user));
                localStorage.setItem('currentUserToken', JSON.stringify(authUser.token));

                this.currentUserSubject.next(authUser.user);
                this.currentUserTokenSubject.next(authUser.token);
                return authUser;
            }));
    }

    changePassword(model: ChangePassword) {
        return this.http.post<any>(`${environment.apiUrl}/accounts/changepassword`, model);
    }

    setUserContext(user: UserInfo) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        this.currentUserSubject.next(null);
    }
}
