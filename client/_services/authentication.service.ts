import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email, password) {
        var url = 'users/login';
        var body = {"email": email, "password": password};
        return this.http.post(url, body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // console.log(response.headers.get('Auth'));
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(response.headers.get('Auth'));
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', response.headers.get('Auth'));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}
