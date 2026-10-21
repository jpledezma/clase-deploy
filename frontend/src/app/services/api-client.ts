import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UserModel } from '../interfaces/user-model';
import { environment } from '../../environments/environment';

@Service()
export class ApiClient {
  http = inject(HttpClient);
  API_URL = environment.apiUrl;
  getUsers() {
    return this.http.get(`${this.API_URL}/user`);
  }

  createUser(user: UserModel) {
    return this.http.post(`${this.API_URL}/user`, user);
  }

  deleteUser(id: string) {
    console.log(`${this.API_URL}/user/${id}`);

    return this.http.delete(`${this.API_URL}/user/${id}`);
  }
}
