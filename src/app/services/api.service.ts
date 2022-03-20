import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUsers(data : any) {
    return this.http.post<any>("http://localhost:3000/users/",data);
  }

  getUsers() {
    return this.http.get<any>("http://localhost:3000/users/");
  }

  putUser(data : any , id : number) {
    return this.http.put<any>("http://localhost:3000/users/" + id,data);
  }

  deleteUser(id : number) {
    return this.http.delete<any>("http://localhost:3000/users/"+id);
  }
}
