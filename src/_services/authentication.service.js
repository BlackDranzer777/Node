import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },    
};

function login(email, password) {
    const data = {
        email: email,
        password: password
      }
    console.log(data)
    return axios.post('http://localhost:3000/login', data)
            .then(handleResponse)
            .then(res => {
                console.log(res, 'user')
                console.log(currentUserSubject.value + 'init_currentuser')
                localStorage.setItem('user', JSON.stringify(res))
                // user = [jwt_decode(user.accessToken), user];
                currentUserSubject.next(res);
                // return user;
                return Promise.resolve(res)
            })
    
}

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         currentUserSubject.next(user);

    //         return user;
    //     });


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    currentUserSubject.next(null);
}