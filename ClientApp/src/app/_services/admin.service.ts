import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRole(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {})
  }

  DeActivateUser(username: string,) {
    return this.http.put(this.baseUrl + 'admin/deactivate/' + username, {});

  }

  updateUser(username: string, model: any) {
    return this.http.put(this.baseUrl + 'admin/edit-user/' + username, model);
  }
}
